const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_NUMBER = 5;
const MAX_COMMENT_LENGTH = 140;
const uploadForm = document.querySelector(`.upload-form`);
const hashtagInput = uploadForm.elements.hashtags;
const commentsTextarea = uploadForm.elements.description;

function validateForm() {
	let isValid = false;

	hideUserMistake(hashtagInput);
	hideUserMistake(commentsTextarea);

	if (hashtagInput.value) {
		const hashtags = hashtagInput.value.trim().split(` `);
		const uniqueHashtags = new Set();

		hashtagInput.setCustomValidity(``);

		if (hashtags.length > MAX_HASHTAG_NUMBER) {
			showUserMistake(hashtagInput);
			hashtagInput.setCustomValidity(`Нельзя указывать больше пяти хэш-тегов`);
			return isValid;
		}

		for (let elem of hashtags) {
			if (!elem.startsWith(`#`)) {
				showUserMistake(hashtagInput);
				hashtagInput.setCustomValidity(`Хэш-тег должен начинаться с символа #`);
				return isValid;
			}

			if (elem.length === 1) {
				showUserMistake(hashtagInput);
				hashtagInput.setCustomValidity(`Хеш-тег не может состоять только из одной решётки;`);
				return isValid;
			}

			uniqueHashtags.add(elem.toLowerCase());

			if (elem.length > MAX_HASHTAG_LENGTH) {
				showUserMistake(hashtagInput);
				hashtagInput.setCustomValidity(`Длина хэш-тега не может быть больше 20 символов`);
				return isValid;
			}

			if (elem.slice(1).indexOf(`#`) !== -1) {
				showUserMistake(hashtagInput);
				hashtagInput.setCustomValidity(`Хэш-теги должны разделяться пробелами`);
				return isValid;
			}
		}

		if (hashtags.length > uniqueHashtags.size) {
			showUserMistake(hashtagInput);
			hashtagInput.setCustomValidity(`Один и тот же хэш-тег не может быть использован дважды`);
			return isValid;
		}
	}

	if (commentsTextarea.value) {
		commentsTextarea.setCustomValidity(``);

		if (commentsTextarea.value.length > MAX_COMMENT_LENGTH) {
			showUserMistake(commentsTextarea);
			commentsTextarea.setCustomValidity(`Длина комментария не может составлять больше 140 символов`);
			return isValid;
		}
	}

	isValid = true;
	return isValid;
}

function showUserMistake(elem) {
	elem.style.border = `5px solid red`;
}

function hideUserMistake(elem) {
	elem.style.border = ``;
}

hashtagInput.addEventListener(`input`, function() {
	hashtagInput.setCustomValidity(``);
});

commentsTextarea.addEventListener(`input`, function() {
	hashtagInput.setCustomValidity(``);
});

export { hideUserMistake, validateForm };
