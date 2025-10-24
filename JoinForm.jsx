"use client";

import { useEffect } from "react";

function initBasicFormValidation(root) {
  const forms = (root ?? document).querySelectorAll("[data-form-validate]");

  forms.forEach((form) => {
    const fields = form.querySelectorAll(
      "[data-validate] input, [data-validate] textarea"
    );
    const submitButtonDiv = form.querySelector("[data-submit]");
    const submitInput = submitButtonDiv?.querySelector('input[type="submit"]');

    if (!submitButtonDiv || !submitInput) return;

    const formLoadTime = new Date().getTime();

    const validateField = (field) => {
      const parent = field.closest("[data-validate]");
      if (!parent) return true;

      const minLength = field.getAttribute("min");
      const maxLength = field.getAttribute("max");
      const type = field.getAttribute("type");
      let isValid = true;

      if (field.value.trim() !== "") {
        parent.classList.add("is--filled");
      } else {
        parent.classList.remove("is--filled");
      }

      if (minLength && field.value.length < Number(minLength)) {
        isValid = false;
      }

      if (maxLength && field.value.length > Number(maxLength)) {
        isValid = false;
      }

      if (type === "email" && !/\S+@\S+\.\S+/.test(field.value)) {
        isValid = false;
      }

      if (isValid) {
        parent.classList.remove("is--error");
        parent.classList.add("is--success");
      } else {
        parent.classList.remove("is--success");
        parent.classList.add("is--error");
      }

      return isValid;
    };

    const startLiveValidation = (field) => {
      field.addEventListener("input", () => {
        validateField(field);
      });
    };

    const validateAndStartLiveValidationForAll = () => {
      let allValid = true;
      let firstInvalidField = null;

      fields.forEach((field) => {
        const valid = validateField(field);
        if (!valid && !firstInvalidField) {
          firstInvalidField = field;
        }
        if (!valid) {
          allValid = false;
        }
        startLiveValidation(field);
      });

      if (firstInvalidField) {
        firstInvalidField.focus();
      }

      return allValid;
    };

    const isSpam = () => {
      const currentTime = new Date().getTime();
      const timeDifference = (currentTime - formLoadTime) / 1000;
      return timeDifference < 5;
    };

    submitButtonDiv.addEventListener("click", () => {
      if (validateAndStartLiveValidationForAll()) {
        if (isSpam()) {
          alert("Form submitted too quickly. Please try again.");
          return;
        }
        submitInput.click();
      }
    });

    form.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && event.target.tagName !== "TEXTAREA") {
        event.preventDefault();
        if (validateAndStartLiveValidationForAll()) {
          if (isSpam()) {
            alert("Form submitted too quickly. Please try again.");
            return;
          }
          submitInput.click();
        }
      }
    });
  });
}

export default function JoinForm() {
  useEffect(() => {
    initBasicFormValidation(document);
  }, []);

  return (
    <section id="join" className="section-join">
      <div className="join-inner">
        <span className="section-label">Join</span>
        <h2>Be first to experience Saige in your organization.</h2>
        <div data-form-validate className="form-group w-form">
          <form
            id="saige-waitlist"
            className="form"
            name="Saige Waitlist"
            data-name="Saige Waitlist"
            method="post"
            noValidate
          >
            <div data-validate className="form-field-group">
              <label htmlFor="name" className="form-label">
                Name <span className="form-required">*</span>
              </label>
              <div className="form-field">
                <input
                  className="form-input w-input"
                  maxLength={256}
                  name="name"
                  data-name="Name"
                  min={3}
                  placeholder="Jordan"
                  type="text"
                  id="name"
                  required
                />
                <div className="form-field-icon is--success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M11.25 14.25L9 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15 10.5L11.25 14.25"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 12C3 16.9706 7.02943 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02943 16.9706 3 12 3C7.02943 3 3 7.02943 3 12Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="form-field-icon is--error">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      opacity="0.1"
                      d="M12 3C16.971 3 21 7.029 21 12C21 16.971 16.971 21 12 21C7.029 21 3 16.971 3 12C3 7.029 7.029 3 12 3Z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 3C16.971 3 21 7.029 21 12C21 16.971 16.971 21 12 21C7.029 21 3 16.971 3 12C3 7.029 7.029 3 12 3Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 12.5V7.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.996 14.5C11.444 14.5 10.996 14.948 11 15.5C11 16.052 11.448 16.5 12 16.5C12.552 16.5 13 16.052 13 15.5C13 14.948 12.552 14.5 11.996 14.5Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div data-validate className="form-field-group">
              <label htmlFor="email" className="form-label">
                Email Address <span className="form-required">*</span>
              </label>
              <div className="form-field">
                <input
                  className="form-input w-input"
                  maxLength={256}
                  name="email"
                  data-name="Email"
                  placeholder="hello@saige.ai"
                  type="email"
                  id="email"
                  required
                />
                <div className="form-field-icon is--success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M11.25 14.25L9 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15 10.5L11.25 14.25"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 12C3 16.9706 7.02943 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02943 16.9706 3 12 3C7.02943 3 3 7.02943 3 12Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="form-field-icon is--error">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      opacity="0.1"
                      d="M12 3C16.971 3 21 7.029 21 12C21 16.971 16.971 21 12 21C7.029 21 3 16.971 3 12C3 7.029 7.029 3 12 3Z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 3C16.971 3 21 7.029 21 12C21 16.971 16.971 21 12 21C7.029 21 3 16.971 3 12C3 7.029 7.029 3 12 3Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 12.5V7.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.996 14.5C11.444 14.5 10.996 14.948 11 15.5C11 16.052 11.448 16.5 12 16.5C12.552 16.5 13 16.052 13 15.5C13 14.948 12.552 14.5 11.996 14.5Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div data-validate className="form-field-group">
              <label htmlFor="message" className="form-label">
                Message <span className="form-required">*</span>
              </label>
              <div className="form-field">
                <textarea
                  className="form-input is--textarea w-input"
                  maxLength={5000}
                  name="message"
                  data-name="Message"
                  min={3}
                  placeholder="Share your leadership goals with us"
                  id="message"
                  required
                />
                <div className="form-field-icon is--success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M11.25 14.25L9 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15 10.5L11.25 14.25"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 12C3 16.9706 7.02943 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02943 16.9706 3 12 3C7.02943 3 3 7.02943 3 12Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="form-field-icon is--error">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      opacity="0.1"
                      d="M12 3C16.971 3 21 7.029 21 12C21 16.971 16.971 21 12 21C7.029 21 3 16.971 3 12C3 7.029 7.029 3 12 3Z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 3C16.971 3 21 7.029 21 12C21 16.971 16.971 21 12 21C7.029 21 3 16.971 3 12C3 7.029 7.029 3 12 3Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 12.5V7.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.996 14.5C11.444 14.5 10.996 14.948 11 15.5C11 16.052 11.448 16.5 12 16.5C12.552 16.5 13 16.052 13 15.5C13 14.948 12.552 14.5 11.996 14.5Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="form-field-group">
              <div className="form-divider" />
            </div>
            <div className="form-field-group">
              <div className="form-field">
                <div data-submit tabIndex={0} className="form-submit-btn">
                  <p className="form-submit-btn-p">Submit</p>
                  <input
                    type="submit"
                    data-wait="Please wait..."
                    className="form-submit w-button"
                    value="Submit"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
