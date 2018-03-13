from flask import flash, redirect, render_template, request, url_for
from flask_login import login_required

from backend import app, db
from backend.models import Course
from backend.forms import CourseForm, CourseScrapeForm, CourseTeeForm
from backend.actions import save_course_data, save_tee_data
from backend.scrapers import swingbyswing as scraper
from backend.dates import date_to_str
from .flash_errors import flash_errors
from .tees import TEES


@app.route('/course_list')
@login_required
def course_list():
    courses = Course.query.all()
    return render_template('course_list.html', title='courses',
                           courses=courses)


@app.route('/course_new', methods=['GET', 'POST'])
@app.route('/course/<course_nickname>', methods=['GET', 'POST'])
@login_required
def course_view(course_nickname=None):
    if course_nickname:
        course = Course.query.filter_by(nickname=course_nickname).first()
        if not course:
            flash('course %s not found' % course_nickname)
            return redirect(url_for('course_list'))
        else:
            course_id = course.id
    else:
        course = None
        course_id = None

    form = CourseForm(request.form, obj=course)

    if request.method == 'POST':
        if form.cancel.data:
            flash('canceled edit')
            return redirect(url_for('course_list'))
        if form.delete.data:
            db.session.delete(course)
            db.session.commit()
            flash('%s deleted' % course.nickname)
            return redirect(url_for('course_list'))

        if form.validate():
            result = save_course_data({
                'course_id': course_id,
                'name': form.name.data,
                'nickname': form.nickname.data
            })
            if result.get('success'):
                flash('saved course')
                return redirect(url_for('course_list'))
            else:
                if result['error'] == 'IntegrityError':
                    flash('course with that nickname already exists')
                else:
                    flash(result['error'])
        else:
            flash_errors(form)

    return render_template('course.html', title='edit course', course=course,
                           form=form,)


@app.route('/course/<course_nickname>/tee_new', methods=['GET', 'POST'])
@app.route('/course/<course_nickname>/tee/<tee_id>',
           methods=['GET', 'POST'])
@login_required
def course_tee(course_nickname, tee_id=None):
    course = Course.query.filter_by(nickname=course_nickname).first()
    if not course:
        flash('course not found')
        return redirect(url_for('course_list'))

    course_tee = course.tees.filter_by(id=tee_id).first()

    form = CourseTeeForm(request.form, obj=course_tee)
    form.color.choices = [(i, TEES[i]) for i in range(len(TEES))]
    form.color.data = TEES.index(course_tee.color) if course_tee else 0

    title = '%s tees edit' % course_tee.color if course_tee else 'new tee'

    if request.method == 'POST':
        if form.cancel.data:
            if course_tee:
                flash('canceled %s' % title)
            else:
                flash('canceled new tee')
            return redirect(url_for('course_view',
                                    course_nickname=course.nickname))
        if form.delete.data:
            db.session.delete(course_tee)
            db.session.commit()
            flash('deleted %s tee' % course_tee.color)
            return redirect(url_for('course_view',
                                    course_nickname=course.nickname))

        if form.validate():
            if course_tee:
                data = course_tee.as_dict()
            else:
                data = {'course_id': course.id}
            data.update({
                'name': TEES[int(request.form['color'])],
                'color': TEES[int(request.form['color'])],
                'date': date_to_str(form.date.data),
                'rating': form.rating.data,
                'slope': form.slope.data,
                'holes': {i: {} for i in range(1, 19)}
            })
            for hole_num in data['holes'].keys():
                data['holes'][hole_num] = {
                    'par': request.form['hole%i_par' % hole_num],
                    'yardage': request.form['hole%i_yardage' % hole_num],
                    'handicap': request.form['hole%i_handicap' % hole_num]
                }

            result = save_tee_data(data)
            if result.get('success'):
                flash('saved tee')
                return redirect(url_for('course_view',
                                        course_nickname=course.nickname))
            else:
                flash(result['error'])
        else:
            flash_errors(form)

    return render_template('course_tee.html', title=title, tee=course_tee,
                           form=form)


@app.route('/course/<course_nickname>/scrape', methods=['GET', 'POST'])
@login_required
def scrape_course(course_nickname):
    form = CourseScrapeForm(request.form)
    title = 'scrape tee data for %s' % course_nickname

    if request.method == 'POST':
        if form.cancel.data:
            flash('canceled course scrape')
            return redirect(url_for('course_view',
                                    course_nickname=course_nickname))

        if form.validate():
            course = Course.query.filter_by(nickname=course_nickname).first()

            # scrape tee data
            scraped_data = scraper.fetch_course(form.url.data)
            if scraped_data.get('error'):
                flash('error scraping data: %s' % scraped_data['error'])
                return redirect(url_for('scrape_course',
                                        course_nickname=course.nickname))

            tees = scraper.extract_course_data(scraped_data['data'])
            for tee in tees.keys():
                if tee in TEES:
                    tees[tee]['course_id'] = course.id
                    save_tee_data(tees[tee])

            flash('scraped tee data for %s' % course.nickname)
            return redirect(url_for('course_view',
                                    course_nickname=course.nickname))

    return render_template('course_scrape.html', title=title, form=form,
                           course_nickname=course_nickname)
