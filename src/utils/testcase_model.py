from pydantic import BaseModel
from typing import List, Optional

class FileModelObj(BaseModel):
    name: str
    content: str

class TestUnitObj(BaseModel):
    output: str
    input: Optional[str] = None
    hidden: bool
    cli_args: Optional[List[str]] = None
    files: Optional[List[FileModelObj]] = None

class TestCaseObj(BaseModel):
    group_id: str
    id: str
    title: str
    description: str
    data: List[TestUnitObj]

