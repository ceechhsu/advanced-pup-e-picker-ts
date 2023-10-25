import { ReactNode } from "react";
import { useDogs } from "../providers/DogsProvider";
import { ActiveTab } from "../types";

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const { dogs, activeTab, setActiveTab } = useDogs();
  const favoriteDogCount = dogs.filter((dog) => dog.isFavorite).length;
  const unfavoriteDogCount = dogs.filter((dog) => !dog.isFavorite).length;

  const handleActiveTab = (value: ActiveTab) => {
    value === activeTab ? setActiveTab("all-dogs") : setActiveTab(value);
  };

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${activeTab === "favorite" ? "active" : ""}`}
            onClick={() => {
              handleActiveTab("favorite");
            }}
          >
            favorited ( {favoriteDogCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${activeTab === "unfavorite" ? "active" : ""}`}
            onClick={() => {
              handleActiveTab("unfavorite");
            }}
          >
            unfavorited ( {unfavoriteDogCount} )
          </div>
          <div
            className={`selector ${
              activeTab === "create-dog-form" ? "active" : ""
            }`}
            onClick={() => {
              handleActiveTab("create-dog-form");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
