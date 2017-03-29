from flask import flash, redirect, render_template, request, url_for
from flask_login import login_required

from app import app, db
from app.models import GolfCourse, Tee


@app.route('/course_list')
@login_required
def course_list():
    courses = GolfCourse.query.all()
    return render_template('course_list.html', title='courses',
                           courses=courses)


@app.route('/course_new', methods=['GET', 'POST'])
@login_required
def course_new():
    if request.method == 'POST':
        new_course = GolfCourse(name=request.form['name'],
                                nickname=request.form['nickname'])
        db.session.add(new_course)
        db.session.commit()
        return redirect(url_for('tee_new', course_id=new_course.id))

    return render_template('course_new.html', title='new course',
                           form=request.form)


@app.route('/course_edit/<course_nickname>/tee_new', methods=['GET', 'POST'])
@login_required
def tee_new(course_nickname):
    course = GolfCourse.query.filter_by(nickname=course_nickname).first()
    if not course:
        flash('course not found')
        return redirect(url_for('course_list'))

    if request.method == 'POST':
        if 'cancel' in request.form:
            flash('canceled new tee')
            return redirect(url_for('course_edit', title='edit course',
                                    course_nickname=course.nickname))

        tee = Tee(date=parse(request.form['date']),
                  color=request.form['tee_color'],
                  rating=int(request.form['rating']),
                  slope=int(request.form['slope']))
        course.tees.append(tee)

        for i in range(1, 19):
            tee.holes.append(Hole(
                hole=i,
                par=int(request.form['hole%i_par' % i]),
                yardage=int(request.form['hole%i_yardage' % i]),
                handicap=int(request.form['hole%i_handicap' % i])
                ))
        db.session.commit()

        flash('saved %s tees' % tee.color)
        return redirect(url_for('course_edit', title='edit course',
                                course_nickname=course.nickname))

    return render_template('tee_new.html', title='new tee',
                           form=request.form)


@app.route('/course_edit/<course_nickname>/tee_edit/<tee_id>',
           methods=['GET', 'POST'])
@login_required
def tee_edit(course_nickname, tee_id):
    course = GolfCourse.query.filter_by(nickname=course_nickname).first()
    if not course:
        flash('course not found')

    tee = course.tees.filter_by(id=tee_id).first()

    if request.method == 'POST':
        if 'cancel' in request.form:
            flash('canceled %s tees edit' % tee.color)
        elif 'delete' in request.form:
            db.session.delete(tee)
            db.session.commit()
            flash('%s tee deleted' % tee.color)
        else:
            tee.date = parse(request.form['date'])
            tee.rating = int(request.form['rating'])
            tee.slope = int(request.form['slope'])
            tee.color = int(request.form['tee_color'])

            for i in range(1, 19):
                par = int(request.form['hole%i_par' % i])
                yardage = int(request.form['hole%i_yardage' % i])
                handicap = int(request.form['hole%i_handicap' % i])

                hole = tee.holes.filter_by(hole=i).first()
                if hole:
                    hole.par = par
                    hole.yardage = yardage
                    hole.handicap = handicap
                else:
                    tee.holes.append(Hole(hole=i, par=par, yardage=yardage,
                                          handicap=handicap))
            db.session.commit()
            flash('saved %s tees' % tee.color)

        return redirect(url_for('course_edit', title='edit course',
                                course_nickname=course.nickname))

    return render_template('tee_edit.html', title='new tee', tee=tee,
                           form=request.form)


@app.route('/course_edit/<course_nickname>', methods=['GET', 'POST'])
@login_required
def course_edit(course_nickname):
    course = GolfCourse.query.filter_by(nickname=course_nickname).first()
    if not course:
        flash('course %s not found' % course_nickname)
        return redirect(url_for('course_list'))

    if request.method == 'POST':
        if 'cancel' in request.form:
            flash('canceled %s edit' % course.nickname)
        elif 'delete' in request.form:
            db.session.delete(course)
            db.session.commit()
            flash('course %s deleted' % course.nickname)
        else:
            course.nickname = request.form['nickname']
            course.name = request.form['name']
            db.session.commit()
            flash('saved %s' % course.nickname)

        return redirect(url_for('course_list'))

    return render_template('course_edit.html', title='edit course',
                           course=course, form=request.form)
