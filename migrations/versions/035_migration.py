from sqlalchemy import *
from migrate import *


from migrate.changeset import schema
pre_meta = MetaData()
post_meta = MetaData()
round = Table('round', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('user_id', Integer),
    Column('course_id', Integer),
    Column('date', DateTime),
    Column('tee_color', String(length=32)),
    Column('total_putts', Integer),
    Column('total_gir', Integer),
    Column('course_handicap', Integer),
    Column('adj_score', Integer),
    Column('handicap_index', Float),
    Column('notes', String(length=128)),
)


def upgrade(migrate_engine):
    # Upgrade operations go here. Don't create your own engine; bind
    # migrate_engine to your metadata
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    post_meta.tables['round'].columns['total_gir'].create()
    post_meta.tables['round'].columns['total_putts'].create()


def downgrade(migrate_engine):
    # Operations to reverse the above upgrade go here.
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    post_meta.tables['round'].columns['total_gir'].drop()
    post_meta.tables['round'].columns['total_putts'].drop()
