import React, { useEffect, useState, useCallback } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

interface Review {
  id: string;
  overallRating: number;
  serviceRating: number;
  pricingRating: number;
  speedRating: number;
  feedback: string;
  name: string;
  city: string;
  createdAt: string;
  recommend: "Yes" | "No";
}

interface GetReviewsResponse {
  reviews: Review[];
  total: number;
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedReviewIds, setExpandedReviewIds] = useState<string[]>([]);
  const [aggregatedData, setAggregatedData] = useState({
    totalReviews: 0,
    averageRating: 0,
    ratingsBreakdown: { overall: 0, service: 0, pricing: 0, speed: 0 },
  });

  const reviewsPerBatch = 5;

  const fetchReviews = useCallback(async (offset: number, limit: number) => {
    setLoading(true);
    try {
      const response = await fetch("/.netlify/functions/getReviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          collection: "mobileplan_review",
          limit,
          offset,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const data: GetReviewsResponse = await response.json();

      const sanitizedReviews = data.reviews.map((review) => ({
        id: review.id || "",
        overallRating: review.overallRating || 0,
        serviceRating: review.serviceRating || 0,
        pricingRating: review.pricingRating || 0,
        speedRating: review.speedRating || 0,
        feedback: review.feedback || "",
        name: review.name || "Anonymous",
        city: review.city || "Unknown",
        createdAt: review.createdAt || "",
        recommend: review.recommend as "Yes" | "No",
      }));

      setReviews((prev) => [...prev, ...sanitizedReviews]);

      // Calculate aggregations
      const totalReviews = sanitizedReviews.length;
      const ratingsBreakdown = sanitizedReviews.reduce(
        (acc, review) => {
          acc.overall += review.overallRating;
          acc.service += review.serviceRating;
          acc.pricing += review.pricingRating;
          acc.speed += review.speedRating;
          return acc;
        },
        { overall: 0, service: 0, pricing: 0, speed: 0 }
      );

      const averageRating = ratingsBreakdown.overall / totalReviews;

      setAggregatedData({
        totalReviews,
        averageRating,
        ratingsBreakdown: {
          overall: ratingsBreakdown.overall / totalReviews,
          service: ratingsBreakdown.service / totalReviews,
          pricing: ratingsBreakdown.pricing / totalReviews,
          speed: ratingsBreakdown.speed / totalReviews,
        },
      });
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews(0, reviewsPerBatch);
  }, [fetchReviews]);

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getRecommendationMessage = (recommends: string, name: string) => {
    if (recommends === "Yes") {
      return (
        <>
          <FaThumbsUp className="inline-block text-green-500 mr-1" />
          {`${name} would recommend this service.`}
        </>
      );
    }
    return (
      <>
        <FaThumbsDown className="inline-block text-red-500 mr-1" />
        {`${name} does not recommend this service.`}
      </>
    );
  };

  const toggleExpandReview = (id: string) => {
    setExpandedReviewIds((prev) =>
      prev.includes(id) ? prev.filter((reviewId) => reviewId !== id) : [...prev, id]
    );
  };

  const getBadgeClass = (rating: number) => {
    if (rating >= 4) return "bg-[#F6642D] text-white";
    if (rating >= 2) return "bg-[#5A2FBA] text-white";
    return "bg-[#D42E58] text-white";
  };

  return (
    <div className="flex justify-center py-10 px-4">
      <div className="w-full max-w-3xl space-y-8">
        <h2 className="text-2xl font-aeonik-bold text-gray-800 text-center leading-relaxed tracking-wide">
          Latest World Mobile Phone Plan Reviews
        </h2>

       {/* JSON-LD Script */}
       <script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "World Mobile Phone Plan",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": aggregatedData.averageRating.toFixed(1),
      "reviewCount": aggregatedData.totalReviews,
      "bestRating": "5",
      "worstRating": "1",
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Service",
        "value": aggregatedData.ratingsBreakdown.service.toFixed(1),
      },
      {
        "@type": "PropertyValue",
        "name": "Pricing",
        "value": aggregatedData.ratingsBreakdown.pricing.toFixed(1),
      },
      {
        "@type": "PropertyValue",
        "name": "Speed",
        "value": aggregatedData.ratingsBreakdown.speed.toFixed(1),
      },
    ],
    "review": reviews.map((review) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.name || "Anonymous",
      },
      "datePublished": review.createdAt || new Date().toISOString(),
      "reviewBody": review.feedback || "No feedback provided.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.overallRating.toFixed(1),
        "bestRating": "5",
        "worstRating": "1",
      },
    })),
  })}
</script>


        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-6 rounded-lg shadow-lg bg-white border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col items-start space-y-2">
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <input
                      key={i}
                      type="radio"
                      name={`rating-${review.id}`}
                      className={`mask mask-star-2 ${
                        i < review.overallRating ? "bg-[#F6642D]" : "bg-gray-500"
                      }`}
                      checked={i === Math.floor(review.overallRating) - 1}
                      readOnly
                    />
                  ))}
                </div>
                <p className="text-sm font-aeonik-bold text-gray-800">
                  {review.name} <span className="font-aeonik-regular text-gray-600">(City: {review.city})</span>
                </p>
              </div>
              <p className="text-sm font-aeonik-regular text-gray-600">{formatDate(review.createdAt)}</p>
            </div>
            <blockquote
              className="mt-4 text-sm font-aeonik-regular text-gray-600 overflow-hidden max-h-20 transition-all duration-300 ease-in-out"
              style={{
                maxHeight: expandedReviewIds.includes(review.id) ? "100%" : "5rem",
              }}
            >
              {expandedReviewIds.includes(review.id) ? (
                review.feedback
              ) : review.feedback.length > 200 ? (
                <>
                  {review.feedback.slice(0, 200)}...
                  <button
                    onClick={() => toggleExpandReview(review.id)}
                    className="text-[#F6642D] underline ml-1"
                  >
                    Read more
                  </button>
                </>
              ) : (
                review.feedback
              )}
            </blockquote>
            <div className="mt-6 flex space-x-4 text-sm font-aeonik-bold">
              <span className={`badge ${getBadgeClass(review.serviceRating)}`}>Service: {review.serviceRating}/5</span>
              <span className={`badge ${getBadgeClass(review.pricingRating)}`}>Pricing: {review.pricingRating}/5</span>
              <span className={`badge ${getBadgeClass(review.speedRating)}`}>Speed: {review.speedRating}/5</span>
            </div>
            <p className="mt-4 text-sm font-aeonik-regular text-gray-800">
              {getRecommendationMessage(review.recommend, review.name)}
            </p>
          </div>
        ))}

        {loading && <p className="text-center text-gray-800">Loading more reviews...</p>}
      </div>
    </div>
  );
};

export default Reviews;