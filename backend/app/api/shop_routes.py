import json
import os
from fastapi import APIRouter, HTTPException
from typing import List, Optional
from ..models.perfume_model import Perfume, PerfumeDetail

router = APIRouter()

MOCK_PERFUMES = [
    Perfume(
        id=1,
        brand_name="Bond No. 9",
        model_name="Bleecker Street",
        description="A woody amber fragrance, blending notes of vanilla, patchouli, and blackcurrant.",
        price=24000.0,
        image_url="/images/perfumes/Bond No. 9 - Bleecker Street.png"
    ),
    Perfume(
        id=2,
        brand_name="Creed",
        model_name="Aventus",
        description="A sophisticated fruity chypre fragrance, celebrating strength, vision, and success.",
        price=30000.0,
        image_url="/images/perfumes/Creed - Aventus.png"
    ),
    Perfume(
        id=3,
        brand_name="Dior",
        model_name="Sauvage",
        description="A radically fresh composition with notes of Calabrian bergamot and Ambroxan.",
        price=12000.0,
        image_url="/images/perfumes/Dior - Sauvage.png"
    ),
    Perfume(
        id=4,
        brand_name="Giorgio Armani",
        model_name="Acqua Di Gio",
        description="A serene and aquatic fragrance capturing the essence of the sea.",
        price=8500.0,
        image_url="/images/perfumes/Giorgio Armani - Acqua Di Gio.png"
    ),
    Perfume(
        id=5,
        brand_name="Gucci",
        model_name="Guilty Pour Homme",
        description="An aromatic fougere fragrance for men with notes of lavender, lemon, and cedar.",
        price=7200.0,
        image_url="/images/perfumes/Gucci - Guilty Pour Homme.png"
    ),
    Perfume(
        id=6,
        brand_name="Parfums de Marly",
        model_name="Haltane",
        description="An original scent featuring a blend of rare and noble ingredients.",
        price=27500.0,
        image_url="/images/perfumes/Parfums de Marly - Haltane.png"
    ),
    Perfume(
        id=7,
        brand_name="Prada",
        model_name="Luna Rossa Carbon",
        description="A seductive, masculine fragrance blending metallic notes with lavender and patchouli.",
        price=7000.0,
        image_url="/images/perfumes/Prada - Luna Rossa Carbon.png"
    ),
    Perfume(
        id=8,
        brand_name="Ralph Lauren",
        model_name="Polo Blue",
        description="An invigorating blend of melon de Cavaillon, basil, verbena, and washed suede.",
        price=6200.0,
        image_url="/images/perfumes/Ralph Lauren - Polo Blue.png"
    ),
    Perfume(
        id=9,
        brand_name="Rasasi",
        model_name="Hawas For Him",
        description="A fresh and elegant oriental woody fragrance crafted for modern men.",
        price=4000.0,
        image_url="/images/perfumes/Rasasi - Hawas For Him.png"
    ),
    Perfume(
        id=10,
        brand_name="Tom Ford",
        model_name="Noir Extreme",
        description="An amber woody fragrance with a tantalizing core.",
        price=13500.0,
        image_url="/images/perfumes/Tom Ford - Noir Extreme.png"
    ),
    Perfume(
        id=11,
        brand_name="Viktor&Rolf",
        model_name="Spicebomb Extreme",
        description="An explosive fragrance with a fiery blend of spices.",
        price=7000.0,
        image_url="/images/perfumes/Viktor&Rolf - Spicebomb Extreme.png"
    ),
    Perfume(
        id=12,
        brand_name="Yves Saint Laurent",
        model_name="La Nuit de l'Homme",
        description="A story of intensity, bold sensuality, and seduction.",
        price=7500.0,
        image_url="/images/perfumes/Yves Saint Laurent - La Nuit de l'Homme.png"
    )
]

@router.get("/perfumes", response_model=List[Perfume])
def get_perfumes(search: Optional[str] = None):
    if search is None:
        return MOCK_PERFUMES

    normalized_query = search.strip().lower()
    if not normalized_query:
        return MOCK_PERFUMES

    return [
        perfume
        for perfume in MOCK_PERFUMES
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
def get_perfume(perfume_id: int):
    base_perfume = next((p for p in MOCK_PERFUMES if p.id == perfume_id), None)
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
        item_form=detail_data.get('item_form', "Unknown"),
        item_volume=detail_data.get('item_volume', "Unknown"),
        target_audience=detail_data.get('target_audience', "Unknown"),
        scent=detail_data.get('scent', "Unknown")
    )
