const notesList = document.querySelector("#notes");

const uuiNote = (note) => {
  const div = document.createElement("div");
  div.innerHTML += `
  <div class="card card-body rounded-0 animate__animated animate__fadeInUp mb-2">
      <div class="d-flex justify-content-between">
          <h1 class="card-title h3">${note.title}</h1>
          <div>
              <button class="btn btn-danger delete" data-id="${note.id}">delete</button>
              <button class="btn btn-secondary update" data-id="${note.id}">update</button>
          </div>
      </div>
      <p>${note.description}</p>
  </div>
`;
  const btnDelete = div.querySelector(".delete");
  btnDelete.addEventListener("click", () => {
    deleteNote(btnDelete.dataset.id);
  });

  return div;
};

const renderNotes = (notes) => {
  notesList.innerHTML = "";
  notes.forEach((note) => {
    notesList.append(uuiNote(note));
  });
};

const appendNote = (note) => {
  notesList.append(uuiNote(note));
};
