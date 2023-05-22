import React from "react";
import Table from "../../Table";

function Content() {
  return (
    <div className="content">
      <div className="content-header">
        <div className="title">
          <h2>List of Users</h2>
        </div>
      </div>
      <Table></Table>
    </div>
  );
}

export default Content;
