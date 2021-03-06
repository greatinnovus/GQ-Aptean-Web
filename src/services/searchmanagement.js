import { get, post } from '../helpers/fetchServicesMethods';
import { toast } from 'react-toastify';
import { url } from '../reducers/url';
import PubSub from 'pubsub-js';

function showLoader() {
    PubSub.publish('msg', true);
}

function hideLoader() {
    PubSub.publish('msg', false);
}

async function getProjectFolders(history) {
    try {
        showLoader();
        return await get(url.getprojectFolder, history)
            .then((response) => {
                hideLoader();
                return response;
            })
            .catch((error) => {
                // toast.error('A');
                console.log("error::", error);
                hideLoader();
                // return dispatch(loginError(error));
                // dispatch(showMessage({ message: error }));
            });
    } catch (error) {
        hideLoader();
        console.error(error);
    }

}
async function getProjectFolderData(id, history) {
    try {
        let projectFolderDetail = url.projectFolderDetail
        projectFolderDetail = projectFolderDetail.replace('**', id);
        let urlParam = projectFolderDetail
        showLoader();
        return await get(urlParam, history)
            .then((response) => {
                // if(response && response.data.response_status == 0)
                // {
                // }else {

                //     let errorMsg = 'Unable to Login';
                //     if(response && typeof response.data.response_content === 'object' && response.data.response_content !== null){
                //         errorMsg = response.data.response_content.message;
                //     }
                //     toast.error(errorMsg);
                // }
                hideLoader();
                return response;
            })
            .catch((error) => {
                //toast.error('A');
                console.log("error::", error);
                hideLoader();
                // return dispatch(loginError(error));
                // dispatch(showMessage({ message: error }));
            });
    } catch (error) {
        hideLoader();
        console.error(error);
    }

}
async function getFolderData(id, history, start, stop) {
    try {
        let projectFolderData = url.projectFolderData
        projectFolderData = projectFolderData.replace('**', id);
        let urlParam = projectFolderData;
        if (start && stop) {
            urlParam = urlParam + "&start=" + start + "&stop=" + stop;
        }
        showLoader();
        return await post(urlParam, null, history)
            .then((response) => {
                hideLoader();
                return response;
            })
            .catch((error) => {
                hideLoader();
                //toast.error('A');
                console.log("error::", error);
            });
    } catch (error) {
        hideLoader();
        console.error(error);
    }
}
async function deleteSearchResult(ids, history) {
    try {
        let deleteSearchResult = url.deleteSearchResult
        deleteSearchResult = deleteSearchResult.replace('**', ids);
        let urlParam = deleteSearchResult;
        // showLoader();
        return await post(urlParam, history)
            .then((response) => {
                // hideLoader();
                return response;
            })
            .catch((error) => {
                hideLoader();
                //toast.error('A');
                console.log("error::", error);
            });
    } catch (error) {
        hideLoader();
        console.error(error);
    }
}
async function moveToFolder(shareId, workflowId, history) {
    try {

        let moveToFolder = url.moveToFolder
        moveToFolder = moveToFolder.replace('FID', shareId);
        moveToFolder = moveToFolder.replace('WID', workflowId);
        let urlParam = moveToFolder;
        showLoader();
        return await get(urlParam, history)
            .then((response) => {
                hideLoader();
                return response;
            })
            .catch((error) => {
                hideLoader();
                //toast.error('A');
                console.log("error::", error);
            });
    } catch (error) {
        hideLoader();
        console.error(error);
    }
}
async function addFolder(parentFolderId, folderName, history) {
    try {

        let addFolder = url.addFolder
        addFolder = addFolder.replace('FNAME', folderName);
        addFolder = addFolder.replace('PFID', parentFolderId);
        let urlParam = addFolder;
        showLoader();
        return await get(urlParam, history)
            .then((response) => {
                hideLoader();
                return response;
            })
            .catch((error) => {
                hideLoader();
                //toast.error('A');
                console.log("error::", error);
            });
    } catch (error) {
        hideLoader();
        console.error(error);
    }
}
async function getSearchResultSet(search, history, start, stop) {
    try {

        let searchResultSet = url.searchResultSet
        searchResultSet = searchResultSet.replace('**', search);
        let urlParam = searchResultSet;
        if (start && stop) {
            urlParam = urlParam + "&start=" + start + "&stop=" + stop;
        }
        showLoader();
        return await get(urlParam, history)
            .then((response) => {
                hideLoader();
                return response;
            })
            .catch((error) => {
                hideLoader();
                //toast.error('A');
                console.log("error::", error);
            });
    } catch (error) {
        hideLoader();
        console.error(error);
    }
}

async function mergeResults(groupA, groupB, title, mergeType) {
    try {

        let mergeUrl = `${url.mergeResults}&title=${title}&merge_type=${mergeType}`
        // &groupA=${groupA}&groupB=${groupB}&title=${title}&merge_type=${mergeType}`;
        mergeUrl = groupA && groupA.length > 0 && groupB && groupB.length > 0 ? `${mergeUrl}&groupA=${groupA.join(',')}&groupB=${groupB.join(',')}` : groupA && groupA.length == 0 && groupB && groupB.length > 0 ? `${mergeUrl}&groupB=${groupB.join(',')}` : groupB && groupB.length == 0 && groupA && groupA.length > 0 ? `${mergeUrl}&groupA=${groupA.join(',')}` : mergeUrl;
        showLoader();
        return await get(mergeUrl)
            .then((response) => {
                hideLoader();
                return response;
            })
            .catch((error) => {
                hideLoader();
                //toast.error('A');
                console.log("error::", error);
            });
    } catch (error) {
        hideLoader();
        console.error(error);
    }
}

async function getMoveSelection(id, history) {
    try {
        let moveSelection = url.moveSelection
        moveSelection = moveSelection.replace(':ids:', id);
        showLoader();
        return await get(moveSelection, history)
            .then((response) => {
                hideLoader();
                return response;
            })
            .catch((error) => {
                console.log("error::", error);
                hideLoader();
            });
    } catch (error) {
        hideLoader();
        console.error(error);
    }

}
async function getResultsSharedWithMe(history) {
    const sharedWithMeUrl = url.itemsSharedWithMe;
    try {
        showLoader();
        return await get(sharedWithMeUrl, history)
            .then((response) => {
                hideLoader();
                return response;
            })
            .catch((error) => {
                hideLoader();
                //toast.error('A');
                console.log("error::", error);
            });
    } catch (error) {
        hideLoader();
        console.error(error);
    }
}
async function getFoldersSharedWithMe(history) {
    const sharedWithMeUrl = url.foldersSharedWithMe;
    try {
        showLoader();
        return await get(sharedWithMeUrl, history)
            .then((response) => {
                hideLoader();
                return response;
            })
            .catch((error) => {
                hideLoader();
                //toast.error('A');
                console.log("error::", error);
            });
    } catch (error) {
        hideLoader();
        console.error(error);
    }
}
const SearchManagementService = {
    getProjectFolders,
    getProjectFolderData,
    getFolderData,
    deleteSearchResult,
    moveToFolder,
    addFolder,
    getSearchResultSet,
    getFoldersSharedWithMe,
    getResultsSharedWithMe,
    mergeResults,
    getMoveSelection
};

export default SearchManagementService;