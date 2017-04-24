from sqlalchemy import *
from migrate import *


from migrate.changeset import schema
pre_meta = MetaData()
post_meta = MetaData()
hole = Table('hole', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('tee_id', Integer),
    Column('hole', Integer),
    Column('yardage', Integer),
    Column('par', Integer),
    Column('rating', Float),
    Column('slope', Integer),
)

round = Table('round', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('user_id', Integer),
    Column('date', DateTime),
    Column('course', String(length=64)),
    Column('course_id', Integer),
    Column('tees', String(length=64)),
    Column('course_handicap', Integer),
    Column('adj_score', Integer),
    Column('handicap_index', Float),
)

tee = Table('tee', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('course_id', Integer),
    Column('tee_color', String(length=32)),
    Column('rating', Float),
    Column('slope', Integer),
)

score = Table('score', pre_meta,
    Column('id', INTEGER, primary_key=True, nullable=False),
    Column('user_id', INTEGER),
    Column('date', DATETIME),
    Column('course', VARCHAR(length=64)),
    Column('course_id', INTEGER),
    Column('tee', VARCHAR(length=64)),
    Column('score', INTEGER),
    Column('putts', INTEGER),
    Column('greens', INTEGER),
    Column('course_handicap', INTEGER),
    Column('adj_score', INTEGER),
    Column('handicap_index', FLOAT),
)

score = Table('score', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('round_id', Integer),
    Column('hole', Integer),
    Column('score', Integer),
    Column('putts', Integer),
    Column('gir', Integer),
)


def upgrade(migrate_engine):
    # Upgrade operations go here. Don't create your own engine; bind
    # migrate_engine to your metadata
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    post_meta.tables['hole'].create()
    post_meta.tables['round'].create()
    post_meta.tables['tee'].create()
    pre_meta.tables['score'].columns['adj_score'].drop()
    pre_meta.tables['score'].columns['course'].drop()
    pre_meta.tables['score'].columns['course_handicap'].drop()
    pre_meta.tables['score'].columns['course_id'].drop()
    pre_meta.tables['score'].columns['date'].drop()
    pre_meta.tables['score'].columns['greens'].drop()
    pre_meta.tables['score'].columns['handicap_index'].drop()
    pre_meta.tables['score'].columns['tee'].drop()
    pre_meta.tables['score'].columns['user_id'].drop()
    post_meta.tables['score'].columns['gir'].create()
    post_meta.tables['score'].columns['hole'].create()
    post_meta.tables['score'].columns['round_id'].create()


def downgrade(migrate_engine):
    # Operations to reverse the above upgrade go here.
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    post_meta.tables['hole'].drop()
    post_meta.tables['round'].drop()
    post_meta.tables['tee'].drop()
    pre_meta.tables['score'].columns['adj_score'].create()
    pre_meta.tables['score'].columns['course'].create()
    pre_meta.tables['score'].columns['course_handicap'].create()
    pre_meta.tables['score'].columns['course_id'].create()
    pre_meta.tables['score'].columns['date'].create()
    pre_meta.tables['score'].columns['greens'].create()
    pre_meta.tables['score'].columns['handicap_index'].create()
    pre_meta.tables['score'].columns['tee'].create()
    pre_meta.tables['score'].columns['user_id'].create()
    post_meta.tables['score'].columns['gir'].drop()
    post_meta.tables['score'].columns['hole'].drop()
    post_meta.tables['score'].columns['round_id'].drop()
