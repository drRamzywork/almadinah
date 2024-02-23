import HeaderSection from '@/components/Home/HeaderSection'
import TopicDetailsHeader from '@/components/Home/Topic/TopicDetails/TopicDetailsHeader'
import Navbar from '@/components/Navbar'
import React from 'react'
import styles from './index.module.scss'
const TopicDetails = () => {
  return (
    <>
      <Navbar />
      <TopicDetailsHeader />

    </>
  )
}

export default TopicDetails

export async function getStaticPaths() {
  const response = await fetch('https://api.almadinah.io/api/Topics/GetMainTopics?lang=2&ContentSamplesToReturn=0&pagenum=1&pagesize=50');
  const topics = await response.json();

  const paths = topics.map(topic => ({
    params: { id: topic.id.toString() },
  }));

  return { paths, fallback: 'blocking' };
}


export async function getStaticProps({ params }) {
  // Fetch main topics with the initial topicId
  let responseMainTopic = await fetch(`https://api.almadinah.io/api/Contents/GetContents?topicId=${params.id}&lang=2&pagenum=1&pagesize=50&withLatLng=false`);
  let dataMainTopic = await responseMainTopic.json();

  const responseSubCategory = await fetch(`https://api.almadinah.io/api/Topics/GetSubCategories?topicId=${params.id}&lang=2&ContentSamplesToReturn=0&pagenum=1&pagesize=50`);
  const dataSubCategory = await responseSubCategory.json();
  // If dataMainTopic array is empty, fetch the subcategory to get a new topicId
  if (!dataMainTopic.length) { // Assuming dataMainTopic is an array and checking its length
    const responseSubCategory = await fetch(`https://api.almadinah.io/api/Topics/GetSubCategories?topicId=${params.id}&lang=2&ContentSamplesToReturn=0&pagenum=1&pagesize=50`);
    const dataSubCategory = await responseSubCategory.json();

    // Check if secondaryTopics array is not empty and has an id
    if (dataSubCategory.secondaryTopics && dataSubCategory.secondaryTopics.length > 0) {
      const newTopicId = dataSubCategory.secondaryTopics[0].id;
      // Use the newTopicId to fetch main topics again
      responseMainTopic = await fetch(`https://api.almadinah.io/api/Contents/GetContents?topicId=${newTopicId}&lang=2&pagenum=1&pagesize=50&withLatLng=false`);
      dataMainTopic = await responseMainTopic.json();
    }
  }

  // Fetch subtopics (assuming this is necessary regardless of the previous condition)
  const responseSubTopic = await fetch(`https://api.almadinah.io/api/Contents/GetContents?topicId=8&lang=2&pagenum=1&pagesize=50&withLatLng=false`);
  const dataSubTopic = await responseSubTopic.json();

  return {
    props: {
      dataMainTopic,
      dataSubTopic,
      dataSubCategory
      // dataSubCategory is not included here since it's only used conditionally
    },
  };
}

