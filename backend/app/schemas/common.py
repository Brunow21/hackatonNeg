from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: str
    service: str
    version: str


class RootResponse(BaseModel):
    service: str
    version: str
    description: str
    docs: str
    health: str
