from sqlalchemy import *
from migrate import *


from migrate.changeset import schema
pre_meta = MetaData()
post_meta = MetaData()
tee = Table('tee', pre_meta,
    Column('id', INTEGER, primary_key=True, nullable=False),
    Column('tee_color', VARCHAR(length=32)),
    Column('rating', FLOAT),
    Column('slope', INTEGER),
    Column('course_id', INTEGER),
)

tee = Table('tee', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('course_id', Integer),
    Column('date', DateTime),
    Column('color', String(length=32)),
    Column('rating', Float),
    Column('slope', Integer),
)


def upgrade(migrate_engine):
    # Upgrade operations go here. Don't create your own engine; bind
    # migrate_engine to your metadata
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    pre_meta.tables['tee'].columns['tee_color'].drop()
    post_meta.tables['tee'].columns['color'].create()
    post_meta.tables['tee'].columns['date'].create()


def downgrade(migrate_engine):
    # Operations to reverse the above upgrade go here.
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    pre_meta.tables['tee'].columns['tee_color'].create()
    post_meta.tables['tee'].columns['color'].drop()
    post_meta.tables['tee'].columns['date'].drop()
