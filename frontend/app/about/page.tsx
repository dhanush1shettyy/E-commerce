"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className={styles.pageContainer}>
        <div className={styles.container}>
          <div className={styles.header}>
            <p className={styles.eyebrow}>About ESSENCE</p>
            <h1>
              A curated home for <span className={styles.goldText}>timeless fragrances</span>
            </h1>
            <div className={styles.divider}></div>
            <p className={styles.subtitle}>
              ESSENCE was created for people who believe fragrance is more than a product.
              It is memory, mood, and identity in a single bottle.
            </p>
          </div>

          <div className={styles.sectionsWrapper}>
            <div className={styles.gridCards}>
              <article className={styles.contentCard}>
                <h2>Our Backstory</h2>
                <p>
                  The idea started with a simple frustration: finding truly premium scents online
                  often felt overwhelming and impersonal. We built ESSENCE to make discovery
                  intentional, where each fragrance is selected for quality, character, and craft.
                </p>
                <p>
                  From iconic fashion houses to niche masterpieces, our collection is curated to
                  help every customer find a signature scent that feels personal and lasting.
                </p>
              </article>

              <article className={styles.contentCard}>
                <h2>What We Offer</h2>
                <p>
                  ESSENCE brings together luxury fragrances for men and women in one curated
                  storefront. You can browse by collection, explore best sellers, and search by
                  brands you trust.
                </p>
                <p>
                  Our goal is simple: make premium fragrance shopping elegant, clear, and inspiring
                  from first click to final order.
                </p>
              </article>
            </div>

            <article className={styles.promiseCard}>
              <h2>Our Promise</h2>
              <p>
                Every page at ESSENCE is designed to help you discover fragrance with confidence.
                We focus on authenticity, thoughtful curation, and a premium shopping experience
                that reflects the luxury of the scents themselves.
              </p>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}