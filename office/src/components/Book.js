import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Button,
} from "reactstrap";

import Office from "./Office";

const Book = (props) => {
  const [totalOffices, setTotalOffices] = useState([]);

  // User's selections
  const [selection, setSelection] = useState({
    office: {
      name: null,
      id: null,
    },
    date: new Date(),
    time: null,
    location: "Any Location",
    size: 0,
  });

  // User's booking details
  const [booking, setBooking] = useState({
    name: "",
    phone: "",
    email: "",
  });

  // List of potential locations
  const [locations] = useState([
    "Any Location",
    "Jaipur",
    "Udaipur",
    "Banglore",
    "Chennai",
    "Delhi",
  ]);
  const [times] = useState([
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ]);
  // Basic reservation "validation"
  const [reservationError, setReservationError] = useState(false);

  const getdate = (_) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date =
      months[selection.date.getMonth()] +
      " " +
      selection.date.getDate() +
      " " +
      selection.date.getFullYear();
      // let time = selection.time.slice(0, -2);
      let time = selection.time;
      // time =
    //   selection.time > 12
    //     ? parseInt(time) + 12 + ":00"
    //     : parseInt(time) + ":00";
    // time = parseInt(time) + ":00";
    console.log(time);
    const datetime = new Date(date + " " + time);
    // console.log(datetime);
    return datetime;
  };

  const getEmptyOffices = (_) => {
    let offices = totalOffices.filter((office) => office.isAvailable);
    return offices.length;
  };

  useEffect(() => {
    // Check availability of offices from DB when a date and time is selected
    if (selection.time && selection.date) {
      (async (_) => {
        let datetime = getdate();
        console.log(getdate());

        let res = await fetch("http://localhost:3005/availability", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: datetime,
          }),
        });

        res = await res.json();

        // console.log(res);

        // Filter available offices with location and group size criteria
        let offices = res.offices.filter(
          (office) =>
            (selection.size > 0 ? office.capacity >= selection.size : true) &&
            (selection.location !== "Any Location"
              ? office.location === selection.location
              : true)
        );
        setTotalOffices(offices);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection.time, selection.date, selection.size, selection.location]);

  // Make the reservation if all details are filled out
  const reserve = async (_) => {
    if (
      (booking.name.length === 0) |
      (booking.phone.length === 0) |
      (booking.email.length === 0)
    ) {
      console.log("Incomplete Details");
      setReservationError(true);
    } else {
      const datetime = getdate();
      let res = await fetch("http://localhost:3005/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...booking,
          date: datetime,
          office: selection.office.id,
        }),
      });
      res = await res.text();
      console.log("Reserved: " + res);
      props.setPage(2);
    }
  };

  // Clicking on a office sets the selection state
  const selectOffice = (office_name, office_id) => {
    setSelection({
      ...selection,
      office: {
        name: office_name,
        id: office_id,
      },
    });
  };

  // Generate party size dropdown
  const getSizes = (_) => {
    let newSizes = [];

    for (let i = 1; i < 8; i++) {
      newSizes.push(
        <DropdownItem
          key={i}
          className="booking-dropdown-item"
          onClick={(e) => {
            let newSel = {
              ...selection,
              office: {
                ...selection.office,
              },
              size: i,
            };
            setSelection(newSel);
          }}
        >
          {i}
        </DropdownItem>
      );
    }
    return newSizes;
  };

  // Generate locations dropdown
  const getLocations = (_) => {
    let newLocations = [];
    locations.forEach((loc) => {
      newLocations.push(
        <DropdownItem
          key={loc}
          className="booking-dropdown-item"
          onClick={(_) => {
            let newSel = {
              ...selection,
              office: {
                ...selection.office,
              },
              location: loc,
            };
            setSelection(newSel);
          }}
        >
          {loc}
        </DropdownItem>
      );
    });
    return newLocations;
  };

  // Generate times dropdown
  const getTimes = (_) => {
    let newTimes = [];
    times.forEach((time) => {
      newTimes.push(
        <DropdownItem
          key={time}
          className="booking-dropdown-item"
          onClick={(_) => {
            let newSel = {
              ...selection,
              office: {
                ...selection.office,
              },
              time: time,
            };
            setSelection(newSel);
          }}
        >
          {time}
        </DropdownItem>
      );
    });
    return newTimes;
  };

  // Generating offices from available offices state
  const getOffices = (_) => {
    console.log("Getting offices");
    if (getEmptyOffices() > 0) {
      let offices = [];
      totalOffices.forEach((office) => {
        if (office.isAvailable) {
          offices.push(
            <Office
              key={office._id}
              id={office._id}
              workStations={office.capacity}
              name={office.name}
              empty
              selectOffice={selectOffice}
            />
          );
        } else {
          offices.push(
            <Office
              key={office._id}
              id={office._id}
              workStations={office.capacity}
              name={office.name}
              selectOffice={selectOffice}
            />
          );
        }
      });
      return offices;
    }
  };

  return (
    <div>
      <Row noGutters className="g-0 text-center align-items-center office-cta">
        <Col>
          <p className="looking-for-office">
            {!selection.office.id ? "Book a Office" : "Confirm Reservation"}
            <i
              className={
                !selection.office.id
                // <i class="fas fa-building"></i>
                  ? "fas fa-building office-space"
                  : "fas fa-clipboard-check office-space"
              }
            ></i>
            
          </p>
          <p className="selected-office">
            {selection.office.id
              ? "You are booking " + selection.office.name
              : null}
          </p>

          {reservationError ? (
            <p className="reservation-error">
              * Please fill out all of the details.
            </p>
          ) : null}
        </Col>
      </Row>

      {!selection.office.id ? (
        <div id="reservation-stuff">
          <Row noGutters className="g-0 text-center align-items-center">
            <Col xs="12" sm="3">
              <input
                type="date"
                required="required"
                className="booking-dropdown"
                value={selection.date.toISOString().split("T")[0]}
                onChange={(e) => {
                  if (!isNaN(new Date(new Date(e.target.value)))) {
                    let newSel = {
                      ...selection,
                      office: {
                        ...selection.office,
                      },
                      date: new Date(e.target.value),
                    };
                    setSelection(newSel);
                  } else {
                    console.log("Invalid date");
                    let newSel = {
                      ...selection,
                      office: {
                        ...selection.office,
                      },
                      date: new Date(),
                    };
                    setSelection(newSel);
                  }
                }}
              ></input>
            </Col>
            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">
                  {selection.time === null ? "Select a Time" : selection.time}
                </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu">
                  {getTimes()}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">
                  {selection.location}
                </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu">
                  {getLocations()}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">
                  {selection.size === 0
                    ? "No. of Work Stations"
                    : selection.size.toString()}
                </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu">
                  {getSizes()}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
          </Row>
          <Row noGutters className="g-0 offices-display">
            <Col>
              {getEmptyOffices() > 0 ? (
                <p className="available-offices">{getEmptyOffices()} available</p>
              ) : null}

              {selection.date && selection.time ? (
                getEmptyOffices() > 0 ? (
                  <div>
                    <div className="office-key">
                      <span className="empty-office"></span> &nbsp; Available
                      &nbsp;&nbsp;
                      <span className="full-office"></span> &nbsp; Unavailable
                      &nbsp;&nbsp;
                    </div>
                    <Row noGutters className="g-0">{getOffices()}</Row>
                  </div>
                ) : (
                  <p className="office-display-message">No Available Offices</p>
                )
              ) : (
                <p className="office-display-message">
                  Please select a date and time for your reservation.
                </p>
              )}
            </Col>
          </Row>
        </div>
      ) : (
        <div id="confirm-reservation-stuff">
          <Row
            noGutters
            className="g-0 text-center justify-content-center reservation-details-container"
          >
            <Col xs="12" sm="3" className="reservation-details">
              <Input
                type="text"
                bsSize="lg"
                placeholder="Name"
                className="reservation-input"
                value={booking.name}
                onChange={(e) => {
                  setBooking({
                    ...booking,
                    name: e.target.value,
                  });
                }}
              />
            </Col>
            <Col xs="12" sm="3" className="reservation-details">
              <Input
                type="text"
                bsSize="lg"
                placeholder="Phone Number"
                className="reservation-input"
                value={booking.phone}
                onChange={(e) => {
                  setBooking({
                    ...booking,
                    phone: e.target.value,
                  });
                }}
              />
            </Col>
            <Col xs="12" sm="3" className="reservation-details">
              <Input
                type="text"
                bsSize="lg"
                placeholder="Email"
                className="reservation-input"
                value={booking.email}
                onChange={(e) => {
                  setBooking({
                    ...booking,
                    email: e.target.value,
                  });
                }}
              />
            </Col>
          </Row>
          <Row noGutters className="g-0 text-center">
            <Col>
              <Button
                color="none"
                className="book-office-btn"
                onClick={(_) => {
                  reserve();
                }}
              >
                Book Now
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Book;
