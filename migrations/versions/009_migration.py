from sqlalchemy import *
from migrate import *


from migrate.changeset import schema
pre_meta = MetaData()
post_meta = MetaData()
round = Table('round', pre_meta,
    Column('id', INTEGER, primary_key=True, nullable=False),
    Column('user_id', INTEGER),
    Column('date', DATETIME),
    Column('course', VARCHAR(length=64)),
    Column('course_id', INTEGER),
    Column('tees', VARCHAR(length=64)),
    Column('course_handicap', INTEGER),
    Column('adj_score', INTEGER),
    Column('handicap_index', FLOAT),
)

round = Table('round', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('user_id', Integer),
    Column('date', DateTime),
    Column('course', String(length=64)),
    Column('course_id', Integer),
    Column('tee_color', String(length=32)),
    Column('course_handicap', Integer),
    Column('adj_score', Integer),
    Column('handicap_index', Float),
)


def upgrade(migrate_engine):
    # Upgrade operations go here. Don't create your own engine; bind
    # migrate_engine to your metadata
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    pre_meta.tables['round'].columns['tees'].drop()
    post_meta.tables['round'].columns['tee_color'].create()


def downgrade(migrate_engine):
    # Operations to reverse the above upgrade go here.
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    pre_meta.tables['round'].columns['tees'].create()
    post_meta.tables['round'].columns['tee_color'].drop()
