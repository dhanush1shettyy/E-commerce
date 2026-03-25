"use client";

import { useEffect, useState } from "react";
import styles from "./collections.module.css";
import type { Perfume } from "@/types/perfume";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type PerfumeGender = "male" | "female";

const isValidGender = (value: string | null): value is PerfumeGender =>
  value === "male" || value === "female";

export default function CollectionsPage() {
  const searchParams = useSearchParams();
  const selectedGenderParam = searchParams.get("gender");
  const selectedGender = isValidGender(selectedGenderParam) ? selectedGenderParam : null;
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedGender) {
      setPerfumes([]);
      setLoading(false);
      return;
    }

    const fetchPerfumes = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/shop/perfumes?gender=${selectedGender}`);
        const data: Perfume[] = await response.json();
        setPerfumes(data);
      } catch (error) {
        console.error("Failed to fetch perfumes", error);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchPerfumes();
  }, [selectedGender]);

  const collectionTitle = selectedGender === "male" ? "For Men" : "For Women";
  const collectionDescription =
    selectedGender === "male"
      ? "Bold, refined fragrances with depth and character."
      : "Elegant, radiant scents designed to leave a lasting trail.";
  const collectionImage =
    selectedGender === "male" ? "/images/for-men.jpg" : "/images/for-women.jpg";
  const collectionImageAlt =
    selectedGender === "male" ? "Man applying perfume" : "Woman applying perfume";

  return (
    <>
      <Navbar />
      <div className={styles.pageContainer}>
        <div className={styles.container}>
          <div className={styles.header}>
            <p className={styles.eyebrow}>Collections</p>
            <h1>
              For <span className={styles.goldText}>Men</span> &{" "}
              <span className={styles.goldText}>Women</span>
            </h1>
            <div className={styles.divider}></div>
            <p className={styles.subtitle}>
              Choose a collection to explore fragrances by gender.
            </p>
          </div>

          {!selectedGender ? (
            <div className={styles.collectionCardsGrid}>
              <Link href="/collections?gender=male" className={styles.collectionCard}>
                <div className={styles.collectionCardImageWrap}>
                  <Image
                    src="/images/for-men.jpg"
                    alt="For Men"
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    className={styles.collectionCardImage}
                  />
                </div>
                <div className={styles.collectionCardInfo}>
                  <h2>For Men</h2>
                  <p>Discover fragrances curated for the men&apos;s collection.</p>
                </div>
              </Link>

              <Link href="/collections?gender=female" className={styles.collectionCard}>
                <div className={styles.collectionCardImageWrap}>
                  <Image
                    src="/images/for-women.jpg"
                    alt="For Women"
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    className={styles.collectionCardImage}
                  />
                </div>
                <div className={styles.collectionCardInfo}>
                  <h2>For Women</h2>
                  <p>Discover fragrances curated for the women&apos;s collection.</p>
                </div>
              </Link>
            </div>
          ) : (
            <>
              <section className={styles.audienceSection}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionPhotoWrapper}>
                    <Image
                      src={collectionImage}
                      alt={collectionImageAlt}
                      fill
                      sizes="(max-width: 600px) 120px, 180px"
                      className={styles.sectionPhoto}
                    />
                  </div>
                  <div>
                    <h2>{collectionTitle}</h2>
                    <p>{collectionDescription}</p>
                  </div>
                </div>

                <Link href="/collections" className={styles.backToCollections}>
                  Back to all collections
                </Link>
              </section>

              {loading ? (
                <div className={styles.loadingState}>
                  <div className={styles.spinner}></div>
                </div>
              ) : perfumes.length === 0 ? (
                <div className={styles.emptyState}>
                  No perfumes are available in this collection right now.
                </div>
              ) : (
                <div className={styles.productsGrid}>
                  {perfumes.map((perfume, index) => (
                    <Link href={`/shop/${perfume.id}`} key={perfume.id}>
                      <div
                        className={styles.productCard}
                        style={{ animationDelay: `${(index % 4) * 0.1}s` }}
                      >
                        <div className={styles.productImageWrapper}>
                          <Image
                            src={perfume.image_url}
                            alt={`${perfume.brand_name} ${perfume.model_name}`}
                            width={140}
                            height={200}
                            className={styles.bottleImg}
                          />
                        </div>
                        <div className={styles.productInfo}>
                          <div className={styles.productBrand}>{perfume.brand_name}</div>
                          <div className={styles.productTitle}>{perfume.model_name}</div>
                          <div className={styles.productPrice}>
                            Rs. {perfume.price.toLocaleString("en-IN")}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
