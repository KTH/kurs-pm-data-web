/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import i18n from '../../../../i18n'
import { ExtraHeaderHead } from './ContentHead'

@inject(['routerStore'])
@observer
class NewSectionEditor extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    isOpen: this.props.isEmptyNew || false,
    contentForEditor: this.props.initialValue || '', // this.props.routerStore???
    contentForTitle: this.props.initialTitle || '', // Default value needed
    visibleInMemo: this.props.visibleInMemo,
    isEmptyNew: this.props.isEmptyNew || false
  }

  userLangIndex = this.props.routerStore.language === 'sv' ? 1 : 0

  memoLangIndex = this.props.routerStore.memoLanguageIndex

  render() {
    const { contentId } = this.props // menuId, visibleInMemo

    const { contentForEditor, contentForTitle, isEmptyNew, visibleInMemo } = this.state

    const { sourceInfo } = i18n.messages[this.userLangIndex]

    return (
      <span className="Add--New--Title--And--Info">
        {!this.state.isOpen && !isEmptyNew && (
          <ExtraHeaderHead header={contentForTitle} contentId={contentId} memoLangIndex={this.memoLangIndex} />
        )}

        {!this.state.isOpen &&
          !isEmptyNew &&
          /* is included in memo, preview text without editor */
          ((visibleInMemo && (
            <span
              dangerouslySetInnerHTML={{
                __html: (contentForEditor !== '' && contentForEditor) || `<p><i>${sourceInfo.noInfoYet}</i></p>`
              }}
            />
          )) ||
            /* editor has content but is not yet included in pm */
            (contentForEditor !== '' && ( // TODO: add DEFAULT TEXT
              <span>
                <p>
                  {/* <i>{type === 'optionalEditable' ? sourceInfo.notIncludedInMemoYet : sourceInfo.notIncludedInMemoYetOfAddition}</i> */}
                  <i>{sourceInfo.notIncludedInMemoYet}</i>
                </p>
              </span>
            )))}
      </span>
    )
  }
}
export default NewSectionEditor
