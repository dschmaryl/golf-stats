from sqlalchemy import *
from migrate import *


from migrate.changeset import schema
pre_meta = MetaData()
post_meta = MetaData()
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
    Column('par_3_avg', Float),
    Column('par_4_avg', Float),
    Column('par_5_avg', Float),
)


def upgrade(migrate_engine):
    # Upgrade operations go here. Don't create your own engine; bind
    # migrate_engine to your metadata
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    post_meta.tables['golf_round'].columns['par_3_avg'].create()
    post_meta.tables['golf_round'].columns['par_4_avg'].create()
    post_meta.tables['golf_round'].columns['par_5_avg'].create()


def downgrade(migrate_engine):
    # Operations to reverse the above upgrade go here.
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    post_meta.tables['golf_round'].columns['par_3_avg'].drop()
    post_meta.tables['golf_round'].columns['par_4_avg'].drop()
    post_meta.tables['golf_round'].columns['par_5_avg'].drop()
