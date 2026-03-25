import os
from sqlmodel import create_engine, SQLModel, Session, select
from typing import Generator
from app.models.perfume_model import Perfume

# Use DATABASE_URL from env or default to a local mysql connection for docker
DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://root:rootpassword@localhost:3306/ecommerce_auth")

engine = create_engine(DATABASE_URL, echo=True)


DEFAULT_PERFUMES = [
    Perfume(
        brand_name="Bond No. 9",
        model_name="Bleecker Street",
        description="A woody amber fragrance, blending notes of vanilla, patchouli, and blackcurrant.",
        price=24000.0,
        image_url="/images/perfumes/Bond No. 9 - Bleecker Street.png",
    ),
    Perfume(
        brand_name="Creed",
        model_name="Aventus",
        description="A sophisticated fruity chypre fragrance, celebrating strength, vision, and success.",
        price=30000.0,
        image_url="/images/perfumes/Creed - Aventus.png",
    ),
    Perfume(
        brand_name="Dior",
        model_name="Sauvage",
        description="A radically fresh composition with notes of Calabrian bergamot and Ambroxan.",
        price=12000.0,
        image_url="/images/perfumes/Dior - Sauvage.png",
    ),
    Perfume(
        brand_name="Giorgio Armani",
        model_name="Acqua Di Gio",
        description="A serene and aquatic fragrance capturing the essence of the sea.",
        price=8500.0,
        image_url="/images/perfumes/Giorgio Armani - Acqua Di Gio.png",
    ),
    Perfume(
        brand_name="Gucci",
        model_name="Guilty Pour Homme",
        description="An aromatic fougere fragrance for men with notes of lavender, lemon, and cedar.",
        price=7200.0,
        image_url="/images/perfumes/Gucci - Guilty Pour Homme.png",
    ),
    Perfume(
        brand_name="Parfums de Marly",
        model_name="Haltane",
        description="An original scent featuring a blend of rare and noble ingredients.",
        price=27500.0,
        image_url="/images/perfumes/Parfums de Marly - Haltane.png",
    ),
    Perfume(
        brand_name="Prada",
        model_name="Luna Rossa Carbon",
        description="A seductive, masculine fragrance blending metallic notes with lavender and patchouli.",
        price=7000.0,
        image_url="/images/perfumes/Prada - Luna Rossa Carbon.png",
    ),
    Perfume(
        brand_name="Ralph Lauren",
        model_name="Polo Blue",
        description="An invigorating blend of melon de Cavaillon, basil, verbena, and washed suede.",
        price=6200.0,
        image_url="/images/perfumes/Ralph Lauren - Polo Blue.png",
    ),
    Perfume(
        brand_name="Rasasi",
        model_name="Hawas For Him",
        description="A fresh and elegant oriental woody fragrance crafted for modern men.",
        price=4000.0,
        image_url="/images/perfumes/Rasasi - Hawas For Him.png",
    ),
    Perfume(
        brand_name="Tom Ford",
        model_name="Noir Extreme",
        description="An amber woody fragrance with a tantalizing core.",
        price=13500.0,
        image_url="/images/perfumes/Tom Ford - Noir Extreme.png",
    ),
    Perfume(
        brand_name="Viktor&Rolf",
        model_name="Spicebomb Extreme",
        description="An explosive fragrance with a fiery blend of spices.",
        price=7000.0,
        image_url="/images/perfumes/Viktor&Rolf - Spicebomb Extreme.png",
    ),
    Perfume(
        brand_name="Yves Saint Laurent",
        model_name="La Nuit de l'Homme",
        description="A story of intensity, bold sensuality, and seduction.",
        price=7500.0,
        image_url="/images/perfumes/Yves Saint Laurent - La Nuit de l'Homme.png",
    ),
]


def seed_perfumes(session: Session) -> None:
    has_perfume = session.exec(select(Perfume.id)).first()
    if has_perfume:
        return

    for perfume in DEFAULT_PERFUMES:
        session.add(
            Perfume(
                brand_name=perfume.brand_name,
                model_name=perfume.model_name,
                description=perfume.description,
                price=perfume.price,
                image_url=perfume.image_url,
            )
        )
    session.commit()

def init_db():
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        seed_perfumes(session)

def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session
