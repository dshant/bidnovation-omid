import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { useForm } from "react-hook-form";
import Layout from "../Layout";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";

import styles from "./style.module.css";
import typoStyles from "../../styles/typography.module.css";
import { Grid, TextField, Select, MenuItem } from "@mui/material";

const UserInfoCard = ({ handleChange }) => {
  const { handleUpdateEntrie, setUserData } = useContext(UserContext);

  const [activeForm, setActiveForm] = useState(1);
  const [loading, setLoading] = useState(false);
  const timeSlots = [
    { value: "8am-12pm", name: "8am - 12pm" },
    { value: "12pm-4pm", name: "12pm - 4pm" },
    { value: "4pm-8pm", name: "4pm - 8pm" },
  ];
  let weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const findWorkingDates = () => {
    const result = [];
    for (let i = 1; i <= 5; i++) {
      const date = new Date(new Date().setDate(new Date().getDate() + i));
      const day = date.getDay();
      if (day === 6 || day === 0 || result.length >= 3) {
        continue;
      }
      result.push({
        date: `${date.getMonth() + 1}/${date.getDate()}`,
        day: weekday[day],
      });
    }
    return result;
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      date: "",
      firstName: "",
      lastName: "",
      time: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      await handleUpdateEntrie(values);
      setUserData(values);

      if (activeForm === 1) {
        return setActiveForm(2);
      } else {
        return handleChange(4);
      }
    } catch (err) {
      console.error(err);
    } finally {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setLoading(false);
    }
  };

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/\D/g, "");

    const formattedPhoneNumber = phoneNumber.replace(
      /(\d{3})(\d{3})(\d{4})/,
      "($1) $2-$3"
    );

    return formattedPhoneNumber;
  };

  const handleNumberChange = () => {
    const formattedValue = formatPhoneNumber(event.target.value);
    setValue("phone", formattedValue);
  };

  return (
    <Layout>
      <p className={`${typoStyles.p} ${styles.scheduleHeading}`}>
        Let's schedule a call!
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {(() => {
          if (activeForm === 1) {
            return (
              <Fade right cascade duration={1000}>
                <div className={styles.formContainer}>
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        variant="outlined"
                        {...register("firstName", {
                          required: true,
                        })}
                        className={`${styles.textField} text-field`}
                        fullWidth
                        label="First Name"
                        value={watch("firstName") || ""}
                        error={errors && errors?.firstName ? true : false}
                        helperText={
                          errors?.firstName ? "First Name is required" : null
                        }
                        autoComplete="off"
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        variant="outlined"
                        {...register("lastName", {
                          required: true,
                        })}
                        className={`${styles.textField} text-field`}
                        fullWidth
                        label="Last Name"
                        value={watch("lastName") || ""}
                        error={errors && errors?.lastName ? true : false}
                        helperText={
                          errors?.lastName ? "Last Name is required" : null
                        }
                        autoComplete="off"
                      />
                    </Grid>
                  </Grid>
                </div>
              </Fade>
            );
          }

          return (
            <Slide right cascade duration={1000}>
              <div className={`phoneInputClass ${styles.formContainer}`}>
                <Grid container rowSpacing={3} columnSpacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      variant="outlined"
                      className={`${styles.textField} text-field`}
                      fullWidth
                      {...register("phone", {
                        required: true,
                        pattern: {
                          value: /\(?\d{3}\)?-? *\d{3}-? *-?\d{4}/,
                          message: "Invalid Phone Number",
                        },
                      })}
                      onChange={handleNumberChange}
                      value={watch("phone") || ""}
                      label="Phone Number"
                      error={errors && errors?.phone ? true : false}
                      helperText={
                        errors?.phone
                          ? errors.phone.message || "Phone Number is required"
                          : null
                      }
                      autoComplete="off"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      variant="outlined"
                      className={`${styles.textField} text-field`}
                      fullWidth
                      {...register("email", {
                        required: true,
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      label="Email Address"
                      value={watch("email") || ""}
                      error={errors && errors?.email ? true : false}
                      helperText={
                        errors?.email
                          ? errors.email.message || "Email Address is required"
                          : null
                      }
                      autoComplete="off"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      variant="outlined"
                      select
                      fullWidth
                      {...register("date", {
                        required: true,
                      })}
                      className={`${styles.textField} text-field`}
                      value={watch("date") || " "}
                      label="Availablity"
                      error={errors && errors?.date ? true : false}
                      helperText={
                        errors?.date
                          ? errors.date.message || "Date is required"
                          : null
                      }
                    >
                      <MenuItem
                        disabled
                        className={styles.dropdown}
                        value={" "}
                      >
                        Select Availablity
                      </MenuItem>
                      {findWorkingDates()?.map((date) => (
                        <MenuItem
                          className={styles.dropdown}
                          value={date.date}
                        >{`${date.day} ${date.date}`}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      variant="outlined"
                      select
                      fullWidth
                      {...register("time", {
                        required: true,
                      })}
                      value={watch("time") || " "}
                      label="Best Time To Call"
                      error={errors && errors?.time ? true : false}
                      helperText={errors?.time ? "Time is required" : null}
                      className={`${styles.textField} text-field`}
                    >
                      <MenuItem
                        disabled
                        className={styles.dropdown}
                        value={" "}
                      >
                        Select Best Time To Call
                      </MenuItem>
                      {timeSlots.map((time) => (
                        <MenuItem
                          className={styles.dropdown}
                          value={time.value}
                        >
                          {time.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </div>
            </Slide>
          );
        })()}

        <div div className={styles.buttonHolder}>
          <button
            type="submit"
            disabled={!isDirty || !isValid || isSubmitting}
            className={`${styles.button} ${
              loading ? styles.buttonLoading : ""
            }`}
          >
            {(() => {
              if (loading) {
                return <span className="loader white"></span>;
              }

              if (activeForm === 1) {
                return "Next";
              }

              return "Let's do this!";
            })()}
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default UserInfoCard;
