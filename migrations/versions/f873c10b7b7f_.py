"""empty message

Revision ID: f873c10b7b7f
Revises: 5e21c6dfaeb6
Create Date: 2022-12-13 15:22:02.030472

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f873c10b7b7f'
down_revision = '5e21c6dfaeb6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('board', schema=None) as batch_op:
        batch_op.add_column(sa.Column('tab', sa.Text(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('board', schema=None) as batch_op:
        batch_op.drop_column('tab')

    # ### end Alembic commands ###
