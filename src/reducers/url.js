export const url = {
    login: "do=gquser.login&format=json",
    searchResult: "do=mygq.get_welcome_page_v2&format=json",
    searchResultStatus: "do=gqworkflow.get_status&format=json&key=progress",
    news: "do=mygq.get_news_bullet&format=json",
    seqSearchInit: "do=gqft.launch_seq_search&format=json",
    seqSearchSubmit: "do=gqworkflow.submit_seq_search&workflow_type=GqWfIpSearch&view_helper=ObjectViewer::full&format=json",
    mostRecentTypeUrl: "resultsummNew/index.html#/resbrowse/wf:**.resdb/1",
    mostRecentClassicUrl: "do=gqresult&db=wf:**.resdb&is_workspace_recognized=1&def_view=query",
    mostRecentReportUrl: "resultsummNew/index.html#/antibody/overview/**",
    progress: "do=gqworkflow.get_status&workflow=id:**&format=json",
    accountInfo: "do=gquser.get_info&format=json",
    getprojectFolder: "do=gqfolder.get_home_folder&format=json",
    projectFolderDetail: "do=gqfolder.get_info&format=json&form=dojo&depth=4&id=**",
    projectFolderData: "do=gqfolder.get_elements_v2&id=**&sort=-create_time&format=json",
    deleteSearchResult: "do=gqshareable.delete&format=json&id=**&is_recursive=true",
    forgotPassword: "do=gquser.recover_password_V2&userid=",
    searchResPaging: "do=gqfolder.get_elements&id=:id:&sort=:ST:&start=:S1:&stop=:S2:&nocache=:NC:&format=json",
    logout: "do=gquser.logout&format=json",
    createFolder: "do=gqfolder.create_subfolder&format=json&id=**&text_label=",
    deleteFolder: "do=gqshareable.delete&format=json&is_recursive=true&id=**", // same as deleteItems
    moveToFolder: "do=gqfolder.move_shareable_to&format=json&sharing_setting=inherit_recursive&id=FID&shareable_id=WID",
    deleteItems: "do=gqshareable.delete&format=json&is_recursive=true&id=**",
    getServerInfo: "do=gqft.get_server_info&format=json",
    addFolder: "do=gqfolder.create_subfolder&format=json&id=PFID&text_label=FNAME",
    copyright: "do=gqft.get_copyright_info&format=json",
    antibodySearch: "do=gqworkflow&workflow_type=GqWfABIpSearch&format=json&view_helper=ObjectViewer::full",
    authInfoAB: "do=gqresult2.get_auth_info_4ab&format=json&db=wf:ab.resdb",
    seqWorkflow: "do=gqworkflow.get_info_ft&format=json&workflow=id:**",

    seqShareInfo: "do=gqshareable.get_acl_form&id=**&format=json",

    seqAlertInfo: "do=gqworkflow.get_schedule_form&id=**&format=json",
    seqTechnicalData: "do=gqworkflow.get_log&workflow=id:**",
    getAlertRedos: "do=gqworkflow.get_related_workflows_ft&bid=**&format=json",
    updateSeqNotes: "do=gqworkflow.update&id=WID&format=json&description=**",
    downloadQuerySeq: "do=gqworkflow.show_result&workflow=id:**&workflow_output_name=queries.fasta",
    updateAlertSetting: "do=gqworkflow.update_schedule&format=json&activate=on&relaunch_interval=**&id=WID",
    removeAlert: "do=gqworkflow.delete_schedule&format=json&relaunch_interval=&id=WID",

    removeResultShare: "do=gqshareable.update_acl&format=json&id=WID&read_sharee_id=UID&is_read_recursive=1&write_sharee_id=UID&is_write_recursive=1&request.preventCache=TIMESTAMP",

    //patentNumberLookup:"https://stage.genomequestlive.com/query?do=gqfetch.field_search&field=PN",
    browserDBLink: "do=mygq&from_ft=true#4",
    patentNumLink: "do=gqfetch.get_field_search_form&from_ft=true",
    alignSequencesDirectly: "do=gqsearch.get_align_pair_form&from_ft=true",
    searchResultSet: "do=gqshareable.qsearch&format=json&text=**",
    userList: "do=gqshareable.get_acl_form&id=**&format=json",

    seqShareList: "do=gqworkflow.get_sharees_ft&format=json&workflow=id:**",
    seqAddSharee: "do=gqworkflow.add_sharees_ft&format=json&workflow=id:**&userId=UID",
    seqRemoveSharee: "do=gqworkflow.remove_sharee_ft&format=json&workflow=id:**&userId=UID",

    browseSeqDB: "do=gqfetch&db=id:**",
    getPageCount: "do=gquser.get_paging_size",
    updateSeqData: "do=gqworkflow.update&id=WID&format=json",
    fullTextSearchTerm: "do=gqft.suggest_term&format=json",
    fullTextSearchResult: "do=gqft.search_by_text&format=json",
    getSearchCount: "do=gqfolder.get_folder_info&format=json",
    mergeResults: "do=gqworkflow.merge_results&format=json",
    fullDocView: "do=gqft.get_patent_doc&format=json",

    shareableList: "do=gqAccessFt.shareable_list&id=:id:&format=json",
    addAccess: "do=gqAccessFt.add_shared_item&id=:id:&usr=:usr:&acl=:acl:&format=json",
    removeAccess: "do=gqAccessFt.remove_shared_item&id=:id:&usr=:usr:&format=json",
    removeAll: "do=gqAccessFt.remove_all&id=:id:&format=json",
    sharedWith: "do=gqAccessFt.get_shared_with&id=:id:&format=json",
    itemsSharedWithMe: "do=gqAccessFt.shared_with_me&format=json", //based on folder
    foldersSharedWithMe: "do=gqAccessFt.folders_shared_with_me&format=json",
    autoqueryfindterm: "do=gqft.find_term&format=json&term_id=**",
    updateAutoQueryTerm: "json_query=:searchTerm&format=json&do=gqft.update_term&user_id=:UID&term_id=:TERMID",
    saveFTDocument: "do=gqft.save_ftdoc&workflow_type=GqWfSearchFT&format=json",

    moveSelection: "do=gqfolder.get_move_selection&id=:ids:&format=json"
}
