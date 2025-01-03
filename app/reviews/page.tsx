"use client";

import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import JoinDiscussion from "../../components/pages/reviews/discussions";
import MetaFields from "../../components/pages/reviews/metafields";
import ReviewSummary from "../../components/pages/reviews/ReviewSummary";
import PostReview from "../../components/pages/reviews/post-review";
import Latestreviews from "../../components/pages/reviews/latestreviews";

const MobilePlanReviewsPage = () => {
  const [summaryData, setSummaryData] = useState({
    totalReviews: 1,
    averageRating: 5,
    ratingsBreakdown: {
      overall: 5,
      service: 5,
      pricing: 5,
      speed: 5,
    },
  });
  const [loadingSummary, setLoadingSummary] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoadingSummary(true);
      try {
        const response = await fetch("/.netlify/functions/getReviewSummary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ collection: "broadband_review" }),
        });

        const data = await response.json();
        if (response.ok) {
          setSummaryData({
            totalReviews: data.totalReviews ?? 0,
            averageRating: data.averageOverallRating ?? 0,
            ratingsBreakdown: {
              overall: data.ratingsBreakdown?.overall ?? 0,
              service: data.ratingsBreakdown?.service ?? 0,
              pricing: data.ratingsBreakdown?.pricing ?? 0,
              speed: data.ratingsBreakdown?.speed ?? 0, // Ensure "speed" is included here
            },
          });
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error fetching review summary:", error);
      } finally {
        setLoadingSummary(false);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-gray-100 to-white text-black">
      {/* Header */}
      <Header />

      {/* Meta Fields */}
      <MetaFields />

      {/* Main Content */}
      <main className="flex-grow w-full py-12 px-4">
        <div className="container mx-auto space-y-16">
          {/* Page Header */}
          <header className="text-center max-w-5xl mx-auto px-4 py-12 md:py-14 space-y-6">
  <h1
    id="home-internet-reviews-header"
    className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-black px-6 md:px-8 py-4 md:py-6 mb-8"
  >
    Real Reviews from World&nbsp;Mobile<br />
    <span className="text-transparent bg-gradient-to-r from-[#F6642D] via-[#D42E58] to-[#5A2FBA] bg-clip-text">
      Home&nbsp;Internet
    </span>{" "}
    Customers
  </h1>
  <p className="mt-4 text-base sm:text-lg md:text-xl leading-relaxed text-gray-600">
    Thinking about upgrading to a new home internet provider? Read real customer reviews to explore the speed, reliability, and value of these services before you make a decision.
  </p>
</header>






          {/* Review Summary */}
          <section id="review-summary" aria-labelledby="review-summary-title">
          <h2
            id="review-summary-title"
            className="sr-only text-lg md:text-xl font-medium leading-snug tracking-tight text-gray-800"
          >
            How do customers rate World Mobile Home Internet?
          </h2>

            {loadingSummary ? (
              <p className="text-center text-gray-700">Loading summary...</p>
            ) : (
              <ReviewSummary
                totalReviews={summaryData.totalReviews}
                averageRating={summaryData.averageRating}
                ratingsBreakdown={summaryData.ratingsBreakdown}
              />
            )}
          </section>

          {/* Latest Reviews */}
          <section id="latest-reviews" aria-labelledby="latest-reviews-title">
          <h2
            id="latest-reviews-title"
            className="sr-only text-lg md:text-xl font-medium leading-snug tracking-tight text-gray-800"
          >
            Latest Customer Reviews
          </h2>

            <Latestreviews />
          </section>

          {/* Post New Review */}
          <section id="post-review" aria-labelledby="post-review-title">
          <h2
            id="post-review-title"
            className="sr-only text-lg md:text-xl font-medium leading-snug tracking-tight text-gray-800"
          >
            Post a New Review
          </h2>
            <PostReview />
          </section>

          {/* Join Discussion Section */}
          <section
            id="join-discussion"
            aria-labelledby="join-discussion-title"
            className="space-y-8"
          >
            <h2
            id="join-discussion-title"
            className="sr-only text-lg md:text-xl font-medium leading-snug tracking-tight text-gray-800"
          >
            Join the Community
          </h2>

            <JoinDiscussion />
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MobilePlanReviewsPage;
