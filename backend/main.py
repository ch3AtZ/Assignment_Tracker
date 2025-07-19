from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from . import database, models, schemas, router, auth

# Restore direct table creation for SQLite-only use
models.Base.metadata.create_all(bind=database.engine)
app = FastAPI()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/signup")
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return router.create_user(db, user)

@app.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    return auth.authenticate_user(db, user.username, user.password)

@app.post("/assignments/create")
async def create_assignment(
    title: str = Form(...),
    description: str = Form(...),
    username: str = Form(...),
    file: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    user = db.query(models.User).filter(models.User.username == username).first()
    if not user or user.role != "teacher":
        raise HTTPException(status_code=403, detail="Not authorized")
    file_path = None
    if file:
        file_location = f"backend/uploads/assignments/{file.filename}"
        with open(file_location, "wb") as f:
            f.write(await file.read())
        file_path = file_location
    return router.create_assignment(db, user.id, title, description, file_path)

@app.post("/assignments/submit")
async def submit_assignment(
    assignment_id: int = Form(...),
    content: str = Form(...),
    username: str = Form(...),
    file: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    user = db.query(models.User).filter(models.User.username == username).first()
    if not user or user.role != "student":
        raise HTTPException(status_code=403, detail="Not authorized")
    file_path = None
    if file:
        file_location = f"backend/uploads/submissions/{file.filename}"
        with open(file_location, "wb") as f:
            f.write(await file.read())
        file_path = file_location
    return router.submit_assignment(db, user.id, assignment_id, content, file_path)

@app.get("/assignments/{assignment_id}/submissions")
def view_submissions(assignment_id: int, username: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == username).first()
    if not user or user.role != "teacher":
        raise HTTPException(status_code=403, detail="Not authorized")
    return router.get_submissions_by_assignment(db, assignment_id)

@app.get("/assignments")
def list_assignments(db: Session = Depends(get_db)):
    return router.list_assignments(db)

@app.get("/assignments/{assignment_id}/download")
def download_assignment_file(assignment_id: int, db: Session = Depends(get_db)):
    assignment = db.query(models.Assignment).filter(models.Assignment.id == assignment_id).first()
    if not assignment or not assignment.file_path:
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(
        assignment.file_path,
        filename=assignment.file_path.split("/")[-1],
        media_type="application/octet-stream"
    )

@app.get("/submissions/{submission_id}/download")
def download_submission_file(submission_id: int, db: Session = Depends(get_db)):
    submission = db.query(models.Submission).filter(models.Submission.id == submission_id).first()
    if not submission or not submission.file_path:
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(
        submission.file_path,
        filename=submission.file_path.split("/")[-1],
        media_type="application/octet-stream"
    )
