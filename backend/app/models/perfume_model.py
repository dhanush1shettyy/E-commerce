from typing import Optional
from sqlmodel import SQLModel, Field


class PerfumeBase(SQLModel):
    brand_name: str
    model_name: str
    description: str
    price: float
    image_url: str


class Perfume(PerfumeBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)


class PerfumeDetail(PerfumeBase):
    id: int
    item_form: str
    item_volume: str
    target_audience: str
    scent: str
