from sqlalchemy.orm import Session
from . import models, schemas

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(username=user.username, password=user.password, role=user.role)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_assignment(db: Session, user_id: int, title: str, description: str, file_path: str = None):
    new_assignment = models.Assignment(title=title, description=description, created_by=user_id, file_path=file_path)
    db.add(new_assignment)
    db.commit()
    db.refresh(new_assignment)
    return new_assignment

def submit_assignment(db: Session, user_id: int, assignment_id: int, content: str, file_path: str = None):
    new_submission = models.Submission(content=content, assignment_id=assignment_id, student_id=user_id, file_path=file_path)
    db.add(new_submission)
    db.commit()
    db.refresh(new_submission)
    return new_submission

def get_submissions_by_assignment(db: Session, assignment_id: int):
    submissions = db.query(models.Submission).filter(models.Submission.assignment_id == assignment_id).all()
    result = []
    for s in submissions:
        student = db.query(models.User).filter(models.User.id == s.student_id).first()
        result.append({
            'id': s.id,
            'student_id': s.student_id,
            'student_username': student.username if student else None,
            'content': s.content,
            'file_path': s.file_path
        })
    return result

def list_assignments(db: Session):
    return db.query(models.Assignment).all()
