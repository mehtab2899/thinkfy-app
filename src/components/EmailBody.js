import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";

import { emailsBodyList, listEmails } from "../redux/action";
import { getDateAndTime } from "../utils/getDateAndTime";
import "../scss/emailbody.scss";
import { Link, useParams } from "react-router-dom";

const EmailBody = () => {
  const dispatch = useDispatch();

  const { id, subject, name, date } = useParams();

  const emailList = useSelector((state) => state.emailList);

  const emailBody = useSelector((state) => state.emailBody);

  const { emails } = emailList;

  const { loading, emailsBody } = emailBody;

  useEffect(() => {
    dispatch(emailsBodyList(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(listEmails());
  }, [dispatch]);

  const [favorite, setFavorite] = useState(false);

  return (
    <>
      <Link to="/">
        <button className="emails__homebutton">Home</button>
      </Link>
      <div className="emailbody">
        <div className="emailbody__list">
          {emails?.map((email) => {
            return (
              <Link
                to={`/email-body/${email.res.id}/${email.res.subject}/${email.res.from.name}/${email.res.date}`}
                className={`${
                  email.res.id === id ? "emailbody__current--email" : ""
                } emailbody__list--data`}
                key={email.res.id}
              >
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
                  <div className="emails__data--details__favorite">
                    <p className="emails__data--details__para">
                      {getDateAndTime(email.res.date)}
                    </p>
                    {email.res.id === id && favorite && (
                      <span className="emails__text--favorite">Favorite</span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}{" "}
        </div>
        <div className="emailbody__body">
          {loading && <h1>Loading...</h1>}
          {!loading && (
            <div>
              <div className="emailbody__body--header">
                <div className="headings">
                  <div className="emails__data--avatar">{name[0]}</div>
                  <div className="emails__data--details">
                    <h2>{subject}</h2>
                    <p>{getDateAndTime(date)}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setFavorite(true);
                  }}
                >
                  Mark as favorite
                </button>
              </div>
              <div className="emailbody__body--text">
                {parse(emailsBody?.data?.body)}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmailBody;
