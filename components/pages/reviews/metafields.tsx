import React from "react";

const MetaFields = () => {
  return (
    <>
      <title>World Mobile Broadband Customer Reviews | World Mobile Club</title>
      <meta 
        name="description" 
        content="Explore real customer reviews about World Mobile Broadband. Discover insights on reliability, speed, pricing, and overall service to make informed decisions." 
      />
      <meta 
        name="keywords" 
        content="World Mobile Reviews, Broadband Customer Feedback, Internet Provider Ratings, Broadband Reliability, Broadband Speed, Pricing Feedback" 
      />
      <meta name="author" content="World Mobile Club" />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="World Mobile Club" />
      <meta 
        property="og:title" 
        content="Broadband Customer Reviews | World Mobile Club" 
      />
      <meta 
        property="og:description" 
        content="Explore real customer reviews about World Mobile Broadband. Discover insights on reliability, speed, pricing, and overall service to make informed decisions." 
      />
      <meta 
        property="og:url" 
        content="https://wmtx.worldmobile.club/broadband-customer-reviews/" 
      />
      <meta 
        property="og:image" 
        content="/images/world-mobile-review-testimonials.png" 
      />
      <meta property="og:logo" content="/images/club_logo.png" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta 
        name="twitter:title" 
        content="Broadband Customer Reviews | World Mobile Club" 
      />
      <meta 
        name="twitter:description" 
        content="Explore real customer reviews about World Mobile Broadband. Discover insights on reliability, speed, pricing, and overall service to make informed decisions." 
      />
      <meta 
        name="twitter:image" 
        content="/images/world-mobile-review-testimonials.png" 
      />
    </>
  );
};

export default MetaFields;
