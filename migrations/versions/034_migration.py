from sqlalchemy import *
from migrate import *


from migrate.changeset import schema
pre_meta = MetaData()
post_meta = MetaData()
hole = Table('hole', pre_meta,
    Column('id', INTEGER, primary_key=True, nullable=False),
    Column('hole', INTEGER),
    Column('yardage', INTEGER),
    Column('par', INTEGER),
    Column('rating', FLOAT),
    Column('slope', INTEGER),
    Column('tee_id', INTEGER),
)

hole = Table('hole', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('tee_id', Integer),
    Column('hole', Integer),
    Column('par', Integer),
    Column('handicap', Integer),
    Column('yardage', Integer),
)


def upgrade(migrate_engine):
    # Upgrade operations go here. Don't create your own engine; bind
    # migrate_engine to your metadata
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    pre_meta.tables['hole'].columns['rating'].drop()
    pre_meta.tables['hole'].columns['slope'].drop()
    post_meta.tables['hole'].columns['handicap'].create()


def downgrade(migrate_engine):
    # Operations to reverse the above upgrade go here.
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    pre_meta.tables['hole'].columns['rating'].create()
    pre_meta.tables['hole'].columns['slope'].create()
    post_meta.tables['hole'].columns['handicap'].drop()
