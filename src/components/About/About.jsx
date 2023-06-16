import { NavLink } from "react-router-dom";
import "../../styles/about.scss";

export const About = ({ children }) => {
  const menuItem = [
    {
      title: "Welcome Note",
      path: "/about/welcome",
    },
    {
      title: "Mission, Vision, and Values",
      path: "/about/mission",
    },
    {
      title: "Team",
      path: "/about/team",
    },
    {
      title: "TechTitans Advantages",
      path: "/about/advantages",
    },
    {
      title: "FAQs",
      path: "/about/faqs",
    },
  ];
  return (
    <div className="aboutContainers">
      <div className="rightSidebar">
        <div className="rightMenu">
          <div>
            {menuItem.map((item, index) => (
              <NavLink to={item.path} key={index} className="link_link">
                <div className="link_title">{item.title}</div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      <div className="leftSidebar">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default About;
