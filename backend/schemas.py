from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str
    role: str

class UserLogin(BaseModel):
    username: str
    password: str

class AssignmentCreate(BaseModel):
    title: str
    description: str

class SubmissionCreate(BaseModel):
    assignment_id: int
    content: str