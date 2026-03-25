import json
import os
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List, Optional
from ..models.perfume_model import Perfume, PerfumeDetail
from ..database.db import get_session

router = APIRouter()

@router.get("/perfumes", response_model=List[Perfume])
def get_perfumes(
    search: Optional[str] = None,
    gender: Optional[str] = None,
    session: Session = Depends(get_session),
):
    perfumes = session.exec(select(Perfume)).all()

    if gender is not None:
        normalized_gender = gender.strip().lower()
        if normalized_gender:
            perfumes = [
                perfume
                for perfume in perfumes
                if perfume.gender.strip().lower() == normalized_gender
            ]

    if search is None:
        return perfumes

    normalized_query = search.strip().lower()
    if not normalized_query:
        return perfumes

    return [
        perfume
        for perfume in perfumes
        if normalized_query in perfume.brand_name.lower()
        or normalized_query in perfume.model_name.lower()
    ]

CONFIG_PATH = os.path.join(os.path.dirname(__file__), "..", "configs", "perfumes_details.json")

def load_perfume_details():
    try:
        with open(CONFIG_PATH, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

PERFUME_DETAILS_DATA = load_perfume_details()

@router.get("/perfumes/{perfume_id}", response_model=PerfumeDetail)
def get_perfume(perfume_id: int, session: Session = Depends(get_session)):
    base_perfume = session.get(Perfume, perfume_id)
    if not base_perfume:
        raise HTTPException(status_code=404, detail="Perfume not found")

    detail_data = next((d for d in PERFUME_DETAILS_DATA if d.get('brand') == base_perfume.brand_name and d.get('model_name') == base_perfume.model_name), None)
    
    if not detail_data:
        return PerfumeDetail(
            id=base_perfume.id,
            brand_name=base_perfume.brand_name,
            model_name=base_perfume.model_name,
            description=base_perfume.description,
            price=base_perfume.price,
            image_url=base_perfume.image_url,
            gender=base_perfume.gender,
            item_form="Unknown",
            item_volume="Unknown",
            target_audience="Unknown",
            scent="Unknown"
        )

    return PerfumeDetail(
        id=base_perfume.id,
        brand_name=base_perfume.brand_name,
        model_name=base_perfume.model_name,
        description=detail_data.get('description', base_perfume.description),
        price=detail_data.get('price', base_perfume.price),
        image_url=base_perfume.image_url,
        gender=base_perfume.gender,
        item_form=detail_data.get('item_form', "Unknown"),
        item_volume=detail_data.get('item_volume', "Unknown"),
        target_audience=detail_data.get('target_audience', "Unknown"),
        scent=detail_data.get('scent', "Unknown")
    )
