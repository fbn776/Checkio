from pydantic import BaseModel
from typing import List, Optional, Literal


class FileModelObj(BaseModel):
    """A file object that is given by the faculty when creating a testcase"""
    name: str
    content: str

class TestUnitObj(BaseModel):
    """A test unit object that is given by the faculty when creating a testcase"""
    output: str
    input: Optional[str] = None
    hidden: bool
    cli_args: Optional[List[str]] = None
    files: Optional[List[FileModelObj]] = None

class TestCaseObj(BaseModel):
    """Individual testcases ie units of a testcase"""
    group_id: str
    id: str
    title: str
    description: str
    data: List[TestUnitObj]


class TestResult(BaseModel):
    """The result of a testcase evaluation"""
    testunit: TestUnitObj
    status: Literal["passed", "failed"]
    output: str

class TestResultsList(BaseModel):
    """A list of results of a testcase evaluation"""
    results: List[TestResult]