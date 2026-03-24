from pydantic import BaseModel

class Perfume(BaseModel):
    id: int
    brand_name: str
    model_name: str
    description: str
    price: float
    image_url: str

class PerfumeDetail(BaseModel):
    id: int
    brand_name: str
    model_name: str
    description: str
    price: float
    image_url: str
    item_form: str
    item_volume: str
    target_audience: str
    scent: str
