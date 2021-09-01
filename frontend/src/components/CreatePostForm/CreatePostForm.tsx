import React, { useEffect, useMemo, useState } from 'react';
import styles from './styles.module.scss';
import CoverImageSvg from './svg/coverImageSvg';
import { IForm, IModes } from '@root/screens/PostPage/models/IData';
import { useDropzone } from 'react-dropzone';
import TagsDropdown from '../TagsDropdown';
import DropZoneComponent from '@components/DropZoneComponent';
import CopySvg from './svg/copySvg';
import CloseSvg from './svg/closeSvg';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IBindingAction } from '@root/models/Callbacks';
import { Popup } from 'semantic-ui-react';
import HtmlEditor from '@components/HtmlEditor';
import { checkImage } from '@helpers/image.helper';
import LoaderWrapper from '@components/LoaderWrapper';

interface ICreatePostFormProps {
  form: IForm;
  postContent: string;
  modes: IModes;
  isCreateForm: boolean;
  setForm: any;
  sendImage: any;
  allTags: [any];
  imageTag: {
    isPresent: boolean;
    url: string;
    preloader: boolean;
  };
  resetImageTag: IBindingAction;
  isTitleEmpty: boolean;
  isContentEmpty: boolean;
}

const CreatePostForm: React.FC<ICreatePostFormProps> = (
  {
    form,
    postContent,
    setForm,
    sendImage,
    allTags,
    imageTag,
    modes,
    resetImageTag,
    isCreateForm,
    isTitleEmpty,
    isContentEmpty
  }
) => {
  const [initialContent, setInitialContent] = useState(postContent);
  const contentIntact = useMemo(() => (initialContent === postContent), [initialContent, postContent]);

  useEffect(() => {
    if (initialContent === '' || !contentIntact) {
      setInitialContent(postContent);
    } else {
      setInitialContent(initialContent);
    }
  }, [postContent]);

  const { getRootProps } = useDropzone({
    disabled: imageTag.preloader,
    onDrop: files => {
      if (checkImage(files[0])) {
        sendImage({ file: files[0], inContent: true });
      }
    }
  });

  const handelCoverFile = (event: any) => {
    if (!event.target.files[0]) {
      setForm({
        ...form,
        coverImage: {
          url: '',
          title: ''
        }
      });
    } else if (checkImage(event.target.files[0])) {
      sendImage({ file: event.target.files[0], inContent: false });
      setForm({
        ...form,
        coverImage: {
          url: '',
          title: 'loading...'
        }
      });
    }
  };
  const handleTitle = (event: any) => {
    setForm({
      ...form,
      title: event.target.value
    });
  };

  const handleContent = (event: any) => {
    if (typeof event === 'string') {
      setForm({
        ...form,
        content: event
      });
    } else {
      setForm({
        ...form,
        content: event.target.value
      });
    }
  };

  const handleTags = (event: any, data: any) => {
    if (data.value.length <= 5) {
      setForm({
        ...form,
        tags: data.value
      });
    }
  };

  const closeCoverImage = () => {
    setForm({
      ...form,
      coverImage: {
        url: '',
        title: ''
      }
    });
  };

  const getTag = () => (
    modes.htmlMode
      ? `<img src=${imageTag.url} alt="image" />`
      : `![Alt Text](${imageTag.url})`
  );

  let dropzoneOrTag;
  if (!imageTag.isPresent) {
    dropzoneOrTag = <DropZoneComponent sendImage={sendImage} checkImage={checkImage} />;
  } else if (imageTag.preloader) {
    dropzoneOrTag = <div className={styles.image_tag_loading}>Loading image...</div>;
  } else {
    dropzoneOrTag = (
      <div className={styles.image_tag}>
        <div className={styles.tag_image_buttons}>
          <Popup
            content="Copied!"
            on="click"
            pinned
            trigger={(
              <span>
                <CopyToClipboard text={getTag()}>
                  <button aria-label="Copy" type="button">
                    <CopySvg />
                  </button>
                </CopyToClipboard>
              </span>
            )}
          />
          <input type="text" value={getTag()} />
          <button type="button" aria-label="Close" onClick={resetImageTag}><CloseSvg /></button>
        </div>
      </div>
    );
  }
  return (
    <div
      {...getRootProps({ className: 'dropzone' })}
      className={styles.create_post_form}
      style={modes.htmlMode ? { gridTemplateRows: '0.8fr 0.8fr 5.2fr 1fr' } : null}
    >
      { isCreateForm ? (
        <label className={styles.file_input_rectangle} htmlFor="image-input-1" onChange={handelCoverFile}>
          <CoverImageSvg />
          {!form.coverImage.title
            ? <span>Add a cover image</span>
            : (
              <div>
                <span>{form.coverImage.title}</span>
                {form.coverImage.title !== 'loading...'
                && <button type="button" className={styles.close_image} onClick={closeCoverImage}>✖</button>}
              </div>
            )}
          <input
            id="image-input-1"
            disabled={form.coverImage.title !== ''}
            className={styles.invisible}
            type="file"
            accept="image/*"
          />
        </label>
      ) : (
        <Popup
          trigger={(
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label className={styles.file_input_rectangle} style={{ cursor: 'not-allowed' }}>
              <CoverImageSvg />
              <span>Add a cover image</span>
            </label>
        )}
          content="You can't add a cover image when post was created"
          on="hover"
          position="left center"
        />
      )}
      <Popup
        trigger={(
          <input type="text" value={form.title} onChange={handleTitle} placeholder="Enter the title of the article" />
        )}
        content="Title is required"
        open={!form.title && isTitleEmpty}
        position="left center"
      />
      <Popup
        trigger={(
          <div className={styles.content_input_container}>
            { modes.htmlMode ? (
              <div className={styles.editor_input}>
                { !isCreateForm ? (
                  <div>
                    {contentIntact && initialContent !== '' ? (
                      <HtmlEditor
                        value={form.content}
                        initialContent={initialContent}
                        onChange={handleContent}
                        placeholder="Write your post content"
                      />
                    ) : <LoaderWrapper loading /> }
                  </div>
                ) : (
                  <HtmlEditor
                    value={form.content}
                    initialContent={initialContent}
                    onChange={handleContent}
                    placeholder="Write your post content"
                  />
                )}
              </div>
            )
              : (
                <textarea
                  className={styles.content_input}
                  value={form.content}
                  onChange={handleContent}
                  placeholder="Write your post content"
                />
              ) }
          </div>
        )}
        content="Content is required"
        open={!form.content && isContentEmpty}
        position="left center"
      />

      { modes.markdownMode && dropzoneOrTag}
      <Popup
        trigger={(
          <TagsDropdown onChange={handleTags} data={form.tags} allTags={allTags} />
        )}
        content="Max amount of tags has reached"
        open={form.tags.length === 5}
        position="left center"
      />
    </div>
  );
};
export default CreatePostForm;
