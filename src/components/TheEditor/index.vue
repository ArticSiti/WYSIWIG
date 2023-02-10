<template>
	<div class="editor">
		<div class="editor__wrapper">
			<div class="editor__content container">
				<div class="editor__nav">
					<div class="editor__nav-button">
						<button class="button_style button_before" @click="changeBefore">
							<img v-if="!activeBefore" src="@/assets/icons/before.svg" alt="">
							<img v-if="activeBefore" src="@/assets/icons/before_white.svg" alt="">
						</button>
						<button class="button_style button_after" @click="changeAfter">
							<img v-if="!activeAfter" src="@/assets/icons/after.svg" alt="">
							<img v-if="activeAfter" src="@/assets/icons/after_white.svg" alt="">
						</button>
						<button class="button_style button_title" @click="changeTitle">
							<img v-if="!this.titleUpperCase" src="@/assets/icons/title.svg" alt="">
							<img v-if="this.titleUpperCase" src="@/assets/icons/title_white.svg" alt="">
						</button>
						<button class="button_style button_paragraph" @click="changeParagraph">
							<img v-if="!this.paragraphLowerCase" src="@/assets/icons/paragraph.svg" alt="">
							<img v-if="this.paragraphLowerCase" src="@/assets/icons/paragraph_white.svg" alt="">
						</button>
						<button class="button_style button_download"><img src="@/assets/icons/download_images.svg" alt="">
						</button>
						<button class="button_copy" @click="changeCopy">Скопировать HTML</button>
					</div>
				</div>
				<div class="editor__text" contenteditable @input="updateContent($event, 'paragraph')">
					<p>{{ contentMessageTemp }}</p>
				</div>
				<div class="editor__card">
					<div class="editor__card-title">
						<h4>Смотрите какие обезьянки</h4>
					</div>
					<div class="editor__card-img">
						<img src="@/assets/img/image.png" alt="">
					</div>
				</div>
				<div class="editor__text" contenteditable @input="updateContent($event, 'description')">
					<p>{{ contentDescription }}</p>
					<p>{{ contentEnd }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
let contentText = "Таким образом консультация с широким активом представляет " +
		"собой интересный эксперимент проверки позиций, занимаемых участниками в " +
		"отношении поставленных задач. С другой стороны постоянное информационно-пропагандистское " +
		"обеспечение нашей деятельности представляет собой интересный эксперимент проверки форм развития. " +
		"Идейные соображения высшего порядка, а также укрепление и развитие структуры влечет за собой " +
		"процесс внедрения и модернизации соответствующий условий активизации. " +
		"Задача организации, в особенности же реализация намеченных плановых заданий играет важную роль" +
		" в формировании дальнейших направлений развития. Повседневная практика показывает, что постоянное " +
		"информационно-пропагандистское обеспечение нашей деятельности играет важную роль в формировании " +
		"существенных финансовых и административных условий."
let contentDescription = "Таким образом консультация с широким активом представляет собой интересный эксперимент проверки позиций, " +
		"занимаемых участниками в отношении поставленных задач. С другой стороны постоянное информационно-пропагандистское обеспечение" +
		" нашей деятельности представляет собой инйцу шо шщйоц ущойц ущошцщйуо йцщуо йщцоу щйоу шщйцош ущйтересный эксперимент проверки" +
		" форм развития. Идейные соображения высшего порядка, а также укрепление и развитие структуры влечет за собой процесс внедрения " +
		"и модернизации соответствующий условий активизации. Задача организации, " +
		"в особенности же реализация намеченных плановых заданий играет важную роль в формировании дальнейших направлений развития." +
		" Повседневная практика показывает, что постоянное информационно-пропагандистское обеспечение нашей деятельности играет важную роль " +
		"в формировании существенных финансовых и административных условий."
let contentEndText = "Товарищи! новая модель организационной деятельности требуют от нас анализа направлений прогрессивного развития." +
		" Задача организации, в особенности же постоянный количественный рост и сфера нашей активности требуют от нас анализа позиций, " +
		"занимаемых участниками в отношении поставленных задач. Задача организации, в особенности же реализация намеченных " +
		"плановых заданий требуют от нас анализа системы обучения кадров, соответствует насущным потребностям."
export default {
	// eslint-disable-next-line vue/multi-word-component-names
	name: "Editor",
	computed: {},
	components: {},
	props: {},
	data() {
		return {
			copyContent: contentDescription + contentEndText + contentText,
			contentDescription: contentDescription,
			contentEnd: contentEndText,
			contentMessageTemp: contentText,
			copied: "",
			activeBefore: false,
			activeAfter: false,
			titleUpperCase: false,
			paragraphLowerCase: false
		}
	},

	methods: {
		changeTitle() {
			this.titleUpperCase = true
			this.paragraphLowerCase = false
			this.contentMessageTemp = this.contentMessageTemp.toUpperCase();
			return this.contentMessageTemp
		},
		changeParagraph() {
			this.titleUpperCase = false
			this.paragraphLowerCase = true
			this.contentMessageTemp = this.contentMessageTemp.toLowerCase();
			return this.contentMessageTemp
		},
		changeBefore() {
			if (document.execCommand('undo')) {
				this.activeBefore = true
				this.activeAfter = false
			}
		},
		changeAfter() {
			if (document.execCommand('redo')) {
				this.activeBefore = false
				this.activeAfter = true
			}
		},
		changeCopy() {
			try {
				// const content = document.querySelector('.editor__text').innerHTML;
				// const blobInput = new Blob([content], {type: 'text/html'});
				// const clipboardItemInput = new ClipboardItem({'text/html': blobInput});
				// navigator.clipboard.write([clipboardItemInput]);
				let body = document.querySelector('.editor')
				this.copied = body.innerHTML
				navigator.clipboard.writeText(this.copied)
			} catch (e) {
				// Handle error with user feedback - "Copy failed!" kind of thing
				console.log(e);
			}

		},
		updateContent(e, contentType) {
			const inputText = e.target.innerText;
			switch (contentType) {
				case "paragraph":
					this.contentMessage = inputText;
					break;
				default:
					break;
			}
		},
		copyTextNoInput() {
			const storage = document.createElement('textarea');
			storage.value = this.$refs.message.text;
			this.$refs.reference.appendChild(storage);
			storage.select();
			storage.setSelectionRange(0, 99999);
			document.execCommand('copy');
			this.$refs.reference.removeChild(storage);
		},
	},

}
</script>

<style lang="scss" scoped>
@import "@/assets/main";

.editor {
	padding: 76px 0 76px;

	&__nav-button {
		display: flex;

		.button {
			&_style {
				width: 40px;
				height: 40px;
				padding: 10px;
				background-color: #282828;
				border: none;
				border-radius: 4px;
				margin-left: 12px;
				cursor: pointer;

				&:first-child {
					margin-left: 0;
				}

				img {
					width: 100%;
					height: 100%;
					object-fit: contain;
				}
			}

			&_copy {
				height: 40px;
				display: flex;
				align-items: center;
				background: none;
				border: none;
				color: #639EFF;
				font-size: 15px;
				margin-left: 20px;
				transition: .3s;

				&:hover {
					cursor: pointer;
					color: #fff;
				}
			}
		}
	}

	&__text {
		margin-top: 32px;
		border: none;
		outline: none;

		p {
			color: #fff;
			font-size: 15px;
			font-weight: 400;
			line-height: 23px;

			&:first-child {
				margin-bottom: 32px;
			}
		}

	}

	&__card {
		&-title {
			margin: 44px 0 32px;

			h4 {
				font-size: 31px;
				font-weight: 400;
				line-height: 23px;
				color: #ffffff;
			}
		}
		&-img{
			img{
				width: 100%;
				height: 100%;
				object-fit: cover;
				border-radius: 4px;
			}
		}
	}
}
</style>