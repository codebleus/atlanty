const FIELD_SELECTOR = "[data-field]";
const FORM_SELECTOR = "form[data-form-validate]";
const REQUIRED_SELECTOR = "[data-required]";

const EMAIL_RE = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-z0-9-]+\.)+[a-z]{2,24}$/i;

const FORM_MESSAGES = {
  REQUIRED: "Пожалуйста, заполните обязательные поля",
  EMAIL: "Введите корректный email",
  CONSENT: "Согласитесь с условиями",
};

let activeAjaxForm = null;

const accentError = field => {
  if (!field) return;
  field.classList.remove("_error-shake");
  void field.offsetWidth;
  field.classList.add("_error-shake");
  setTimeout(() => {
    field.classList.remove("_error-shake");
  }, 400);
};

export const addError = (field, form) => {
  if (!field) return;
  field.classList.remove("_is-filled");
  field.classList.add("_has-error");
  if (form) form.classList.add("_has-error");
};

export const removeError = (field, form) => {
  if (!field) return;
  field.classList.remove("_has-error");
  field.classList.remove("_error-shake");

  if (form && !form.querySelector("._has-error")) {
    form.classList.remove("_has-error");
  }
};

const wrapFormMessageContent = root => {
  const messages =
    root.matches?.(".form-message") ?
      [root]
    : Array.from(root.querySelectorAll?.(".form-message") || []);

  messages.forEach(message => {
    let outer =
      message.parentElement?.classList.contains("form-message__outer") ?
        message.parentElement
      : null;

    if (!outer) {
      outer = document.createElement("div");
      outer.className = "form-message__outer";
      message.parentNode?.insertBefore(outer, message);
      outer.appendChild(message);
    }

    let shell =
      outer.parentElement?.classList.contains("form-message-shell") ?
        outer.parentElement
      : null;

    if (!shell) {
      shell = document.createElement("div");
      shell.className = "form-message-shell";
      outer.parentNode?.insertBefore(shell, outer);
      shell.appendChild(outer);
    }
  });
};

const getForm = element => element.closest("form");

const getField = element =>
  element.closest(FIELD_SELECTOR) ||
  element.closest("label") ||
  element.closest(".select") ||
  element.parentElement;

const getInputValue = input => (input.value || "").trim();

const getSelectBtn = select => select.querySelector(".select__btn");

const isCheckbox = input => input.type === "checkbox";
const isEmail = input => input.hasAttribute("data-mail-mask");
const isTel = input => input.hasAttribute("data-tel-mask");
const isCustomSelect = element => element.classList?.contains("select");

const getFormCheckboxes = form =>
  Array.from(form.querySelectorAll('input[type="checkbox"]'));

const getRequiredControls = form => {
  const controls = [
    ...Array.from(form.querySelectorAll(REQUIRED_SELECTOR)),
    ...Array.from(form.querySelectorAll(".select")),
  ].filter((control, index, arr) => arr.indexOf(control) === index);

  const checkboxes = getFormCheckboxes(form);

  if (checkboxes.length !== 1) {
    return controls.filter(control => !isCheckbox(control));
  }

  return controls;
};

const getConsentCheckbox = form => {
  const checkboxes = getFormCheckboxes(form);
  if (checkboxes.length !== 1) return null;
  return checkboxes[0];
};

const getSubmitBtn = form =>
  form.querySelector(
    'button[type="submit"], input[type="submit"], button:not([type]), [data-form-btn]',
  );

const isBlockedBtn = btn =>
  !btn ||
  btn.disabled ||
  btn.classList.contains("_disabled") ||
  btn.classList.contains("_is-loading") ||
  btn.getAttribute("aria-disabled") === "true";

const disableBtn = btn => {
  if (!btn) return;
  btn.disabled = true;
  btn.classList.add("_disabled");
  btn.setAttribute("aria-disabled", "true");
};

const enableBtn = btn => {
  if (!btn) return;
  btn.disabled = false;
  btn.classList.remove("_disabled");
  btn.setAttribute("aria-disabled", "false");
};

const isTelComplete = input => {
  if (input.inputmask && typeof input.inputmask.isComplete === "function") {
    return input.inputmask.isComplete();
  }

  const digits = (input.value || "").replace(/\D/g, "");
  return digits.length === 11;
};

const isSelectValid = select => {
  const selectedOption = select.querySelector(
    '[role="option"][aria-selected="true"]',
  );
  return !!selectedOption;
};

const shouldValidateSelectOnLiveInteraction = select => {
  const form = getForm(select);
  const field = getField(select);
  if (!form || !field) return false;
  if (form.dataset.submitAttempted === "true") return true;
  if (field.classList.contains("_has-error")) return true;
  return isSelectValid(select);
};

const isMobileViewport = () => window.matchMedia("(max-width: 767px)").matches;

const getFirstProblemControl = form => {
  const controls = getRequiredControls(form);

  for (const control of controls) {
    const field = getField(control);
    if (field?.classList.contains("_has-error")) {
      return control;
    }
  }

  const checkbox = getConsentCheckbox(form);
  if (checkbox) {
    const field = getField(checkbox);
    if (field?.classList.contains("_has-error")) {
      return checkbox;
    }
  }

  return null;
};

const focusProblemControl = control => {
  if (!control) return;

  if (isCustomSelect(control)) {
    const btn = getSelectBtn(control);
    if (btn && typeof btn.focus === "function") {
      btn.focus({ preventScroll: true });
    }
    return;
  }

  if (typeof control.focus === "function") {
    control.focus({ preventScroll: true });
  }
};

const scrollToProblemControl = form => {
  if (!form || !isMobileViewport()) return;

  const control = getFirstProblemControl(form);
  if (!control) return;

  const field = getField(control);
  const target = field || control;
  if (!target) return;

  const rect = target.getBoundingClientRect();
  const top = window.pageYOffset + rect.top - 96;

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: "smooth",
  });

  setTimeout(() => {
    focusProblemControl(control);
  }, 350);
};

const validateControl = (control, accent = false) => {
  const form = getForm(control);
  const field = getField(control);

  if (!field) return true;

  let valid = true;

  if (isCustomSelect(control)) {
    valid = isSelectValid(control);
  } else if (isCheckbox(control)) {
    valid = !!control.checked;
  } else {
    const value = getInputValue(control);
    valid = value.length > 0;

    if (valid && isEmail(control)) valid = EMAIL_RE.test(value);
    if (valid && isTel(control)) valid = isTelComplete(control);
  }

  if (!valid) {
    const alreadyErrored = field.classList.contains("_has-error");
    addError(field, form);

    if (accent && alreadyErrored) {
      accentError(field);
    }
  } else {
    removeError(field, form);

    if (isCustomSelect(control)) {
      field.classList.add("_is-filled");
    } else if (!isCheckbox(control) && getInputValue(control).length) {
      field.classList.add("_is-filled");
    }
  }

  return valid;
};

const validateForm = (form, accent = false) => {
  const controls = getRequiredControls(form);
  let ok = true;

  controls.forEach(control => {
    const valid = validateControl(control, accent);
    if (!valid) ok = false;
  });

  return ok;
};

const updateSubmitState = form => {
  const btn = getSubmitBtn(form);
  const consent = getConsentCheckbox(form);

  if (!btn || btn.classList.contains("_is-loading")) return;

  if (consent && !consent.checked) {
    disableBtn(btn);
  } else {
    enableBtn(btn);
  }
};

const setSubmitLoading = (form, loading) => {
  const btn = getSubmitBtn(form);
  if (!btn) return;

  if (!btn.dataset.defaultText) {
    btn.dataset.defaultText = btn.innerHTML;
  }

  if (loading) {
    disableBtn(btn);
    btn.classList.add("_is-loading");
    btn.innerHTML =
      'Отправляем<span class="btn-dots"><span>.</span><span>.</span><span>.</span></span>';
  } else {
    btn.classList.remove("_is-loading");
    btn.innerHTML = btn.dataset.defaultText;
    updateSubmitState(form);
  }
};

const clearFormMessage = form => {
  const message = form.querySelector(".form-message_message");
  if (!message) return;

  wrapFormMessageContent(form);

  let icon = message.querySelector(":scope > .form-message__icon");

  if (!icon) {
    icon = document.createElement("span");
    icon.className = "form-message__icon";
  }

  message.innerHTML = "";
  message.appendChild(icon);
};

const setFormMessage = (form, type) => {
  const message = form.querySelector(".form-message_message");
  if (!message) return;

  wrapFormMessageContent(form);

  let icon = message.querySelector(":scope > .form-message__icon");

  if (!icon) {
    icon = document.createElement("span");
    icon.className = "form-message__icon";
  }

  const text = FORM_MESSAGES[type];
  if (!text) return;

  message.innerHTML = "";
  message.appendChild(icon);
  message.insertAdjacentHTML("beforeend", text);
};

const getErroredRequiredControlType = form => {
  const controls = getRequiredControls(form);

  for (const control of controls) {
    const field = getField(control);
    if (!field || !field.classList.contains("_has-error")) continue;

    if (isCheckbox(control)) continue;

    if (!isCustomSelect(control) && isEmail(control)) {
      const value = getInputValue(control);
      if (value.length && !EMAIL_RE.test(value)) {
        return "EMAIL";
      }
    }

    return "REQUIRED";
  }

  return null;
};

const hasConsentErrorOnly = form => {
  const checkbox = getConsentCheckbox(form);
  if (!checkbox) return false;

  const checkboxField = getField(checkbox);
  if (!checkboxField || !checkboxField.classList.contains("_has-error")) {
    return false;
  }

  const controls = getRequiredControls(form);

  for (const control of controls) {
    if (control === checkbox) continue;

    const field = getField(control);
    if (field?.classList.contains("_has-error")) {
      return false;
    }
  }

  return true;
};

const getFormMessageType = form => {
  const mainErrorType = getErroredRequiredControlType(form);

  if (mainErrorType) {
    return mainErrorType;
  }

  if (hasConsentErrorOnly(form)) {
    return "CONSENT";
  }

  const checkbox = getConsentCheckbox(form);
  if (checkbox) {
    const checkboxField = getField(checkbox);
    if (checkboxField?.classList.contains("_has-error")) {
      return "CONSENT";
    }
  }

  return null;
};

const refreshFormMessage = form => {
  if (!form) return;

  const type = getFormMessageType(form);

  if (!type) {
    clearFormMessage(form);
    return;
  }

  setFormMessage(form, type);
};

const initFieldBehavior = field => {
  const input = field.querySelector("input, textarea, select");
  if (!input) return;

  input.addEventListener("input", () => {
    if (input.dataset.mask === "text") {
      input.value = input.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]+/g, "");
    }

    if (!isCheckbox(input)) {
      removeError(field, field.closest("form"));
    }

    if (!isCheckbox(input) && getInputValue(input).length) {
      field.classList.add("_is-filled");
    } else if (!isCheckbox(input)) {
      field.classList.remove("_is-filled");
    }

    const form = field.closest("form");
    if (form) {
      updateSubmitState(form);
      refreshFormMessage(form);
    }
  });

  input.addEventListener("change", () => {
    const form = field.closest("form");
    validateControl(input);

    if (form) {
      updateSubmitState(form);
      refreshFormMessage(form);
    }
  });

  input.addEventListener("focusout", () => {
    const form = field.closest("form");
    validateControl(input);

    if (
      !field.classList.contains("_has-error") &&
      !isCheckbox(input) &&
      getInputValue(input).length
    ) {
      field.classList.add("_is-filled");
    }

    if (form) {
      updateSubmitState(form);
      refreshFormMessage(form);
    }
  });
};

const initSelectBehavior = form => {
  form.querySelectorAll(".select").forEach(select => {
    const btn = getSelectBtn(select);
    if (!btn) return;

    const sync = () => {
      if (shouldValidateSelectOnLiveInteraction(select)) {
        validateControl(select);
      } else {
        const field = getField(select);
        if (field && isSelectValid(select)) {
          field.classList.add("_is-filled");
          removeError(field, form);
        }
      }

      updateSubmitState(form);
      refreshFormMessage(form);
    };

    btn.addEventListener("click", () => {
      setTimeout(sync, 0);
    });

    btn.addEventListener("blur", () => {
      setTimeout(sync, 0);
    });

    const dropdown = select.querySelector('[role="listbox"]');
    if (dropdown) {
      dropdown.addEventListener("click", () => {
        setTimeout(sync, 0);
      });
    }

    const observer = new MutationObserver(() => {
      setTimeout(sync, 0);
    });

    observer.observe(select, {
      subtree: true,
      attributes: true,
      attributeFilter: ["aria-selected", "data-headlessui-state"],
      childList: true,
    });
  });
};

const patchBxAjax = () => {
  if (
    !window.BX ||
    !BX.ajax ||
    typeof BX.ajax.runComponentAction !== "function" ||
    BX.ajax.runComponentAction.__formValidationPatched
  ) {
    return;
  }

  const original = BX.ajax.runComponentAction.bind(BX.ajax);

  BX.ajax.runComponentAction = function (...args) {
    const currentForm = activeAjaxForm;
    const result = original(...args);

    if (result && typeof result.then === "function") {
      return result
        .then(res => {
          if (currentForm) {
            setSubmitLoading(currentForm, false);
            activeAjaxForm = null;
          }
          return res;
        })
        .catch(err => {
          if (currentForm) {
            setSubmitLoading(currentForm, false);
            activeAjaxForm = null;
          }
          throw err;
        });
    }

    if (currentForm) {
      setSubmitLoading(currentForm, false);
      activeAjaxForm = null;
    }

    return result;
  };

  BX.ajax.runComponentAction.__formValidationPatched = true;
};

wrapFormMessageContent(document);

const formMessageObserver = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (!(node instanceof Element)) return;
      wrapFormMessageContent(node);
    });
  });
});

formMessageObserver.observe(document.documentElement, {
  childList: true,
  subtree: true,
});

document.querySelectorAll(FIELD_SELECTOR).forEach(initFieldBehavior);

document.querySelectorAll(FORM_SELECTOR).forEach(form => {
  form.setAttribute("novalidate", "novalidate");
  initSelectBehavior(form);
  updateSubmitState(form);
  refreshFormMessage(form);
});

patchBxAjax();

document.addEventListener(
  "click",
  e => {
    const btn = e.target.closest(
      'button[type="submit"], input[type="submit"], button:not([type]), [data-form-btn]',
    );
    if (!btn) return;

    const form = btn.closest(FORM_SELECTOR);
    if (!form) return;

    form.dataset.submitAttempted = "true";

    const consent = getConsentCheckbox(form);

    if ((consent && !consent.checked) || isBlockedBtn(btn)) {
      validateForm(form, true);
      updateSubmitState(form);
      refreshFormMessage(form);
      scrollToProblemControl(form);
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    }

    const isValid = validateForm(form, true);

    if (!isValid) {
      updateSubmitState(form);
      refreshFormMessage(form);
      scrollToProblemControl(form);
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    }

    clearFormMessage(form);
    activeAjaxForm = form;
    setSubmitLoading(form, true);
  },
  true,
);

document.addEventListener(
  "change",
  e => {
    const target = e.target;
    if (!target.closest('[type="checkbox"]')) return;

    const form = target.closest(FORM_SELECTOR);
    if (!form) return;
    if (!getConsentCheckbox(form)) return;

    validateControl(target);
    updateSubmitState(form);
    refreshFormMessage(form);
  },
  true,
);

document.addEventListener(
  "keydown",
  e => {
    if (e.key !== "Enter" || e.shiftKey) return;

    const target = e.target;
    if (!target) return;
    if (target.tagName === "TEXTAREA") return;

    const form = target.closest(FORM_SELECTOR);
    if (!form) return;

    const btn = getSubmitBtn(form);
    if (!btn) return;

    form.dataset.submitAttempted = "true";

    e.preventDefault();

    if (isBlockedBtn(btn)) {
      validateForm(form, true);
      updateSubmitState(form);
      refreshFormMessage(form);
      scrollToProblemControl(form);
      return false;
    }

    btn.click();
  },
  true,
);
