from flask import flash, redirect, render_template, request, url_for
from flask_login import login_required

from app import app, db, TEES
from app.models import Course
from app.forms import CourseForm, CourseTeeForm
from .flash_errors import flash_errors


@app.route('/course_list')
@login_required
def course_list():
    courses = Course.query.all()
    return render_template('course_list.html', title='courses',
                           courses=courses)


@app.route('/course_new', methods=['GET', 'POST'])
@login_required
def course_new():
    form = CourseForm(request.form)

    if request.method == 'POST':
        if form.cancel.data:
            flash('canceled new course')
            return redirect(url_for('course_list'))

        if form.validate():
            nickname = form.nickname.data
            if Course.query.filter_by(nickname=nickname).first():
                flash('%s already exists' % nickname)
                return render_template('course.html', title='new course',
                                       form=form)
            new_course = Course(name=form.name.data, nickname=nickname)
            db.session.add(new_course)
            db.session.commit()
            return redirect(url_for('course_list'))
        else:
            flash_errors(form)

    return render_template('course.html', title='new course', form=form)


@app.route('/course_edit/<course_nickname>', methods=['GET', 'POST'])
@login_required
def course_edit(course_nickname):
    course = Course.query.filter_by(nickname=course_nickname).first()
    if not course:
        flash('course %s not found' % course_nickname)
        return redirect(url_for('course_list'))

    form = CourseForm(request.form, obj=course)

    if request.method == 'POST':
        if form.cancel.data:
            flash('canceled %s edit' % course.nickname)
            return redirect(url_for('course_list'))

        if form.delete.data:
            db.session.delete(course)
            db.session.commit()
            flash('course %s deleted' % course.nickname)
            return redirect(url_for('course_list'))

        if form.validate():
            course.name = form.name.data
            course.nickname = form.nickname.data
            db.session.commit()
            flash('saved %s' % course.nickname)
            return redirect(url_for('course_list'))
        else:
            flash_errors(form)

    return render_template('course.html', title='edit course', course=course,
                           form=form,)


@app.route('/course_edit/<course_nickname>/tee_new', methods=['GET', 'POST'])
@app.route('/course_edit/<course_nickname>/course_tee/<tee_id>',
           methods=['GET', 'POST'])
@login_required
def course_tee(course_nickname, tee_id=None):
    course = Course.query.filter_by(nickname=course_nickname).first()
    if not course:
        flash('course not found')

    course_tee = course.tees.filter_by(id=tee_id).first()

    form = CourseTeeForm(request.form, obj=course_tee)

    if request.method == 'POST':
        if form.cancel.data:
            flash('canceled %s tees edit' % course_tee.color)
            return redirect(url_for('course_edit', title='edit course',
                                    course_nickname=course.nickname))

        if form.delete.data:
            db.session.delete(course_tee)
            db.session.commit()
            flash('deleted %s tee' % course_tee.color)
            return redirect(url_for('course_edit', title='edit course',
                                    course_nickname=course.nickname))

        if form.validate():
            if course_tee:
                course_tee.color = TEES[form.color.data]
            else:
                course_tee = course.get_new_tee(TEES[form.color.data])
            course_tee.date = form.date.data
            course_tee.rating = float(form.rating.data)
            course_tee.slope = int(form.slope.data)

            for i in range(1, 19):
                course_hole = course_tee.get_hole(i)
                course_hole.par = int(request.form['hole%i_par' % i])
                course_hole.yardage = int(request.form['hole%i_yardage' % i])
                course_hole.handicap = int(request.form['hole%i_handicap' % i])

            db.session.commit()
            flash('saved %s tees' % course_tee.color)
            return redirect(url_for('course_edit', title='edit course',
                                    course_nickname=course.nickname))
        else:
            flash_errors(form)

    return render_template('course_tee.html', title='new tee', tee=course_tee,
                           form=form)
