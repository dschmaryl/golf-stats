from sqlalchemy import *
from migrate import *


from migrate.changeset import schema
pre_meta = MetaData()
post_meta = MetaData()
round = Table('round', pre_meta,
    Column('id', INTEGER, primary_key=True, nullable=False),
    Column('user_id', INTEGER),
    Column('tee_id', INTEGER),
    Column('date', DATETIME),
    Column('notes', VARCHAR(length=128)),
    Column('total_score', INTEGER),
    Column('total_putts', INTEGER),
    Column('total_gir', INTEGER),
    Column('handicap_index', FLOAT),
)

score = Table('score', pre_meta,
    Column('id', INTEGER, primary_key=True, nullable=False),
    Column('round_id', INTEGER),
    Column('hole', INTEGER),
    Column('score', INTEGER),
    Column('putts', INTEGER),
    Column('gir', INTEGER),
    Column('adjusted_score', INTEGER),
)

golf_round = Table('golf_round', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('user_id', Integer),
    Column('tee_id', Integer),
    Column('date', DateTime),
    Column('notes', String(length=128)),
    Column('total_score', Integer),
    Column('total_putts', Integer),
    Column('total_gir', Integer),
    Column('handicap_index', Float),
)

hole_score = Table('hole_score', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('round_id', Integer),
    Column('hole', Integer),
    Column('score', Integer),
    Column('putts', Integer),
    Column('gir', Integer),
    Column('adjusted_score', Integer),
)


def upgrade(migrate_engine):
    # Upgrade operations go here. Don't create your own engine; bind
    # migrate_engine to your metadata
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    pre_meta.tables['round'].drop()
    pre_meta.tables['score'].drop()
    post_meta.tables['golf_round'].create()
    post_meta.tables['hole_score'].create()


def downgrade(migrate_engine):
    # Operations to reverse the above upgrade go here.
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    pre_meta.tables['round'].create()
    pre_meta.tables['score'].create()
    post_meta.tables['golf_round'].drop()
    post_meta.tables['hole_score'].drop()
