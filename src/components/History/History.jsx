import React from "react";
import "./History.css";

const History = () => {
  return (
    <div className="purchase-history-container">
      <h2 className="purchase-history-heading">Purchase History</h2>
      {/* Table Section */}
      <div className="table-container">
        <div className="scrollable-table-container">
          <table className="history-table">
            <thead>
              <tr>
                <th>Package Name</th>
                <th>Starting Date</th>
                <th>Ending Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Rows with provided data */}
              <tr>
                <td>#Basic</td>
                <td>2023-01-01</td>
                <td>2023-12-31</td>
                <td>$100</td>
                <td>Active</td>
              </tr>
              <tr>
                <td>#Advance</td>
                <td>2023-02-01</td>
                <td>2023-11-30</td>
                <td>$200</td>
                <td>Active</td>
              </tr>
              <tr>
                <td>#Basic</td>
                <td>2023-03-01</td>
                <td>2023-09-30</td>
                <td>$120</td>
                <td>Inactive</td>
              </tr>
              <tr>
                <td>#Premium</td>
                <td>2023-05-01</td>
                <td>2023-12-31</td>
                <td>$350</td>
                <td>Active</td>
              </tr>
              <tr>
                <td>#Advance</td>
                <td>2023-07-01</td>
                <td>2023-10-31</td>
                <td>$220</td>
                <td>Inactive</td>
              </tr>
              <tr>
                <td>#Basic</td>
                <td>2023-08-01</td>
                <td>2023-12-31</td>
                <td>$150</td>
                <td>Active</td>
              </tr>
              <tr>
                <td>#Premium</td>
                <td>2023-09-01</td>
                <td>2024-01-31</td>
                <td>$400</td>
                <td>Active</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="pagination-container">
          <div className="who-per-page">Who per page: 5</div>
          <div className="pagination-buttons">
            <button className="pagination-btn">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">3</button>
            <button className="pagination-btn">4</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default History;
