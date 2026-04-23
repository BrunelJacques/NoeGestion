//src/ap_stocks/pages/OneMvt/index.tsx
/* 
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
 */
export default function  OneMvt() {

  // Repris de shiny-agency
/* 
  const { id: queryId } = useParams()
  const [profileData, setProfileData] = useState({})

  useEffect(() => {
    fetch(`http://localhost:8000/freelance?id=${queryId}`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setProfileData(jsonResponse?.freelanceData)
      })
  }, [queryId])

  const {
    picture,
    name,
    location,
    tjm,
    job,
    skills,
    available,
    id,
  } = profileData

 */
  return (
    <div>
      <h1>OneMvt</h1>
    </div>
  );
}

