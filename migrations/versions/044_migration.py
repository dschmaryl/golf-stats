from sqlalchemy import *
from migrate import *


from migrate.changeset import schema
pre_meta = MetaData()
post_meta = MetaData()
course = Table('course', pre_meta,
    Column('id', INTEGER, primary_key=True, nullable=False),
    Column('nickname', VARCHAR(length=32)),
    Column('name', VARCHAR(length=64)),
)

golf_course = Table('golf_course', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('nickname', String(length=32)),
    Column('name', String(length=64)),
)


def upgrade(migrate_engine):
    # Upgrade operations go here. Don't create your own engine; bind
    # migrate_engine to your metadata
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    pre_meta.tables['course'].drop()
    post_meta.tables['golf_course'].create()


def downgrade(migrate_engine):
    # Operations to reverse the above upgrade go here.
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    pre_meta.tables['course'].create()
    post_meta.tables['golf_course'].drop()
