# Key-Mapper Utility: Hardware-to-UI Input Sanitizer

A specialized JavaScript utility designed to intercept hardware keyboard signals and map them to a virtualized input buffer. This tool provides a controlled environment for character injection and input sanitization.

## ⚙️ Core Technical Specifications
* **Signal Mapping:** Direct synchronization between `KeyboardEvent.code` hardware signals and virtual DOM nodes using `data-key` attribute matching.
* **Buffer Management:** Controlled string manipulation for `Backspace` and `Space` triggers to ensure integrity of the displayed character array.
* **Dynamic State Logic:** Implements a global state-toggle for case-sensitivity, re-mapping character codes based on the active `Shift` status.
* **Reactive Buffer Scaling:** Real-time calculation of `scrollHeight` to dynamically adjust the UI height as the input buffer expands.



## 🛠️ Execution Logic
1. **Intercept:** The utility listens at the `window` level for `keydown` triggers.
2. **Sanitize:** The hardware code (e.g., `KeyA`, `ShiftLeft`) is extracted from the event object.
3. **Map:** The `querySelector` identifies the corresponding UI element.
4. **Commit:** The `.click()` method is invoked to push the sanitized character into the `#input` text-area.



## 📂 System Architecture
* `index.html`: UI Structure and Hardware-to-ID mapping.
* `styles.css`: Visual logic, layout constraints, and active-state feedback.
* `script.js`: The core execution engine and event listener logic.

## 🚀 Deployment
To initialize the utility:
1. Load `index.html` in a standards-compliant browser.
2. The hardware listener initializes automatically upon DOM load.
