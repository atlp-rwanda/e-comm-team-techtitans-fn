import { Link } from "react-router-dom";
import "../../styles/aboutPages.scss";

import Mike from "/images/Mike.jpg";
import David from "/images/David.jpg";
import Patrick from "/images/Patrick.jpg";
import Rodrigue from "/images/Rodrigue.jpg";
import Shema from "/images/Shema.jpg";
import Gentille from "/images/Gentille.jpg";
import Faustin from "/images/Faustin.jpg";
import Marie from "/images/Marie.jpg";
import Samuel from "/images/Samuel.jpg";
import Richard from "/images/Richard.jpg";
import Virgile from "/images/Virgile.jpg";
import Edwin from "/images/Edwin.jpg";
import Cynthia from "/images/Cynthia.jpg";

function TeamPage() {
  const teamMembers = [
    {
      id: 1,
      fullName: "Mike ANGUANDIA",
      position: "Manager",
      image: {
        src: Mike,
        link: "https://github.com/Anguandia",
      },
    },
    {
      id: 2,
      fullName: "David NEZA TUYISHIMIRE",
      position: "Technical Team Leader",
      image: {
        src: David,
        link: "https://github.com/David-Neza",
      },
    },
    {
      id: 3,
      fullName: "Patrick MUGWANEZA",
      position: "Software Engineer",
      image: {
        src: Patrick,
        link: "https://github.com/madebypatrick",
      },
    },
    {
      id: 4,
      fullName: "Rodrigue ISHIMWE",
      position: "Software Engineer",
      image: {
        src: Rodrigue,
        link: "https://github.com/Rod-code",
      },
    },
    {
      id: 5,
      fullName: "Jolivet Gislain SHEMA",
      position: "Software Engineer",
      image: {
        src: Shema,
        link: "https://github.com/shemajolivetgislain",
      },
    },
    {
      id: 6,
      fullName: "Gentille E. MANIRAKIZA",
      position: "Software Engineer",
      image: {
        src: Gentille,
        link: "https://github.com/Gentille-dev",
      },
    },
    {
      id: 7,
      fullName: "Faustin NIYONIZEYE",
      position: "Software Engineer",
      image: {
        src: Faustin,
        link: "https://github.com/Folio123-c",
      },
    },
    {
      id: 8,
      fullName: "Marie Cynthia A. KAMIKAZI",
      position: "Software Engineer",
      image: {
        src: Marie,
        link: "https://github.com/Cynthia-kam",
      },
    },
    {
      id: 9,
      fullName: "Samuel NDATIMANA",
      position: "Software Engineer",
      image: {
        src: Samuel,
        link: "https://github.com/NdatimanaSamuel",
      },
    },
    {
      id: 10,
      fullName: "Richard ISHIMWE",
      position: "Software Engineer",
      image: {
        src: Richard,
        link: "https://github.com/RichardIshimwe",
      },
    },
    {
      id: 11,
      fullName: "Edwin BAYINGANA",
      position: "Software Engineer",
      image: {
        src: Edwin,
        link: "https://github.com/EdwinBayingana",
      },
    },
    {
      id: 12,
      fullName: "Cynthia KAYITARE",
      position: "Software Engineer",
      image: {
        src: Cynthia,
        link: "https://github.com/KAYITARES",
      },
    },
    {
      id: 13,
      fullName: "Virgile NDAYAMBAJE",
      position: "Software Engineer",
      image: {
        src: Virgile,
        link: "https://github.com/Virgile1k",
      },
    },
  ];

  const firstRow = teamMembers
    .filter((member) => member.id === 1 || member.id === 2)
    .map((member) => (
      <Link
        to={member.image.link}
        target="_blank"
        rel="noopener noreferrer"
        key={member.id}
      >
        <div className="member-card">
          <img
            className="circular-image"
            src={member.image.src}
            alt={member.fullName}
          />
          <div className="caption">
            <div className="fullname">{member.fullName}</div>
            <div className="position">{member.position}</div>
          </div>
        </div>
      </Link>
    ));

  const otherRows = teamMembers
    .filter((member) => member.id > 2)
    .map((member) => (
      <Link
        to={member.image.link}
        target="_blank"
        rel="noopener noreferrer"
        key={member.id}
      >
        <div className="member-card">
          <img
            className="circular-image"
            src={member.image.src}
            alt={member.fullName}
          />
          <div className="caption">
            <div className="fullname">{member.fullName}</div>
            <div className="position">{member.position}</div>
          </div>
        </div>
      </Link>
    ));

  return (
    <>
      <div className="welcome-texts">
        <h2>Meet Our Team</h2>
        <div className="first-part">{firstRow}</div>
        <hr className="horizontal-line" />

        <div className="second-part">{otherRows}</div>
      </div>
    </>
  );
}

export default TeamPage;
