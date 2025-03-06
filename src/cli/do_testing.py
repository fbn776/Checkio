from sqlalchemy.orm import Session

from core.auth.init_user import init_user
from core.db.db import get_db
from core.db.models.Group import Group
from core.db.models.User import User


def do_testing():
    init_user()
    # db: Session = next(get_db())
    # # user = User(username="fbn776", password="password")
    # # db.add(user)
    # # db.commit()
    # # db.refresh(user)
    # # print(f"Inserted User: ID={user.username}, Password={user.password}")
    # grp = Group(id="grp1", created_by="fbn776")
    # db.add(grp)
    # db.commit()
