import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listEmails } from "../redux/action";
import "../scss/email.scss";
import { getDateAndTime } from "../utils/getDateAndTime";

const EmailList = () => {
  const dispatch = useDispatch();

  const emailList = useSelector((state) => state.emailList);

  const { loading, emails, error } = emailList;

  const [unreadEmails, setUnreadEmails] = useState(false);
  const [readEmails, setReadEmails] = useState(false);
  const [favoriteEmails, setFavoriteEmails] = useState(false);

  useEffect(() => {
    dispatch(listEmails());
  }, [dispatch]);

  return (
    <div className="emails">
      <div className="emails__actions">
        <h2>Filter By:</h2>
        <div className="emails__actions--buttons">
          <button
            className={`${unreadEmails ? "emails__actions--currentBtn" : ""}`}
            onClick={() => {
              setUnreadEmails(true);
              setReadEmails(false);
              setFavoriteEmails(false);
            }}
          >
            Unread
          </button>
          <button
            className={`${readEmails ? "emails__actions--currentBtn" : ""}`}
            onClick={() => {
              setReadEmails(true);
              setUnreadEmails(false);
              setFavoriteEmails(false);
            }}
          >
            Read
          </button>
          <button
            className={`${favoriteEmails ? "emails__actions--currentBtn" : ""}`}
            onClick={() => {
              setFavoriteEmails(true);
              setUnreadEmails(false);
              setReadEmails(false);
            }}
          >
            Favorites
          </button>
        </div>
      </div>
      <div>
        {loading ? (
          <h1 className="emails__marginTop">Loading...</h1>
        ) : error ? (
          { error }
        ) : (
          <div>
            {emails?.map((email) => {
              return (
                <Link
                  to={`/email-body/${email.res.id}/${email.res.subject}/${email.res.from.name}/${email.res.date}`}
                >
                  <div className="emails__data" key={email.id}>
                    <div className="emails__data--avatar">
                      {email.res.from.name[0]}
                    </div>
                    <div className="emails__data--details">
                      <p>
                        <span>
                          From:
                          <span className="emails__data--details__bold">
                            {" "}
                            {email.res.from.name} &lt;{email.res.from.email}
                            &gt;
                          </span>
                        </span>
                      </p>
                      <p>
                        <span>
                          Subject:
                          <span className="emails__data--details__bold">
                            {email.res.subject}
                          </span>
                        </span>
                      </p>
                      <p className="emails__data--details__para">
                        {email.res.short_description}
                      </p>
                      <p className="emails__data--details__para">
                        {getDateAndTime(email.res.date)}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailList;
