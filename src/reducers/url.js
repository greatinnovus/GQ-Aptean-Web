export const url = {
    login: "do=gquser.login&format=json",
    searchResult: "do=mygq.get_welcome_page_v2&format=json",
    searchResultStatus: "do=gqworkflow.get_status&format=json&key=progress",
    news: "do=mygq.get_news_bullet&format=json",
    seqSearchInit: "do=gqft.launch_seq_search&format=json",
    seqSearchSubmit: "do=gqworkflow.submit_seq_search&workflow_type=GqWfIpSearch&view_helper=ObjectViewer::full&format=json",
    mostRecentTypeUrl:"resultsummNew/index.html#/resbrowse/wf:**.resdb/1",
    mostRecentClassicUrl:"do=gqresult&db=wf:**.resdb&is_workspace_recognized=1&def_view=query",
    mostRecentReportUrl:"resultsummNew/index.html#/antibody/overview/**",
    progress: "do=gqworkflow.get_status&workflow=id:**&format=json",
    accountInfo: "do=gquser.get_info&format=json",
    getprojectFolder:"do=gqfolder.get_home_folder&format=json",
    projectFolderDetail:"do=gqfolder.get_info&format=json&form=dojo&depth=4&id=**",
    projectFolderData:"do=gqfolder.get_elements_v2&id=**&sort=-create_time&format=json",
    deleteSearchResult:"do=gqshareable.delete&format=json&id=**&is_recursive=true",
    forgotPassword: "do=gquser.recover_password_V2&userid=",
    searchResPaging: "do=gqfolder.get_elements&id=:id:&sort=:ST:&start=:S1:&stop=:S2:&nocache=:NC:&format=json",
    logout:"do=gquser.logout&format=json",
    createFolder: "do=gqfolder.create_subfolder&format=json&id=**&text_label=",
    //deleteFolder: "do=gqshareable.delete&format=json&is_recursive=true&id=**", // same as deleteItems
    moveToFolder: "do=gqfolder.move_shareable_to&format=json&sharing_setting=inherit_recursive&id=FID&shareable_id=WID",
    deleteItems: "do=gqshareable.delete&format=json&is_recursive=true&id=**",
    getServerInfo: "do=gqft.get_server_info&format=json",
    addFolder:"do=gqfolder.create_subfolder&format=json&id=PFID&text_label=FNAME",
    copyright: "do=gqft.get_server_info&format=json",
    antibodySearch:"do=gqworkflow&workflow_type=GqWfABIpSearch&format=json&view_helper=ObjectViewer::full",
    authInfoAB:"do=gqresult2.get_auth_info_4ab&format=json&db=wf:ab.resdb",
    seqWorkflow:"do=gqworkflow.get_info_ft&format=json&workflow=id:**&workflow_output_name=resdb",
    seqShareInfo:"do=gqshareable.get_acl_form&id=**&format=json",
    seqAlertInfo:"do=gqworkflow.get_schedule_form&id=**&format=json",
    seqTechnicalData:"do=gqworkflow.get_log&workflow=id:**"
}