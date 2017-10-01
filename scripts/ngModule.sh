#!/usr/bin/env bash

SCRIPT_PATH="$(dirname "${0}")"
SCRIPT_FILE="$(basename "${0}")"
_ROOT="$(cd "$(dirname "${0}")/.."; pwd)"

NGC_BIN="${_ROOT}/node_modules/.bin/ngc"

MERGE_PCKG_BIN="${SCRIPT_PATH}/merge_packages.js"

SRC_ROOT="${_ROOT}/src"
BUILD_ROOT="${_ROOT}/build"
DEPLOY_ROOT="${_ROOT}/release"

MODULE_NAME="$(basename "${_ROOT}")"

NOTIFY_BIN="./node_modules/.bin/notify"

function notify () {
  
  local n_title="${MODULE_NAME}"

  "${NOTIFY_BIN}" -t "${n_title}" "${@}" > /dev/null &
}

function notify_message () {

  case ${1} in
    
    error )
      shift
      notify -m "ERROR: ${2}" -s Basso
      ;;
    
    done )
      shift
      notify -m "${1}" -s Glass
      ;;
    
    * )
      notify -m "${@}"
      ;;
  esac

}


function copy_build () {
  if [[ -d "${BUILD_ROOT}" ]]; then
    rm -rf "${BUILD_ROOT}"
  fi  
  echo "sync ${SRC_ROOT} with ${BUILD_ROOT}"
  rsync -azh --delete "${SRC_ROOT}/." "${BUILD_ROOT}"
}

function build () {
  
  echo "compile ${BUILD_ROOT}"  
  cd "${_ROOT}"
  "${NGC_BIN}" -p tsconfig-ngc.json | parseErrors

}

function list_ts () {
  cd "${1}"
  find . -type file | grep .ts$ | grep -v .d.ts$ 
}

function clean_build() {
  printf 'clean up "%s"\n' "${BUILD_ROOT}"
  cd "${BUILD_ROOT}"
  for ts_file in `list_ts "${BUILD_ROOT}"`; do
    #printf '%s\n' "${ts_file}"
    rm "${ts_file}"
  done
}


function deploy () {
  if [[ ! -d "${BUILD_ROOT}" ]]; then
    printf '%s\n' "No build to deploy."
    exit 1
  fi

  rm -rf "${DEPLOY_ROOT}"
  mv "${BUILD_ROOT}" "${DEPLOY_ROOT}"
}


function copy_release () {
  local target_module_path="${1}/node_modules/${MODULE_NAME}"
  local target_folder="${2:-release}"
  local target_path="$(cd "${target_module_path}/${target_folder}"; pwd)"
  local source_path="${_ROOT}/${target_folder}"
  
  if [[ ! -d "${source_path}" ]]; then
    printf '%s\n' "No release to copy."
    exit 1
  fi

  if [[ ! -d "${target_module_path}"  ]]; then
    printf 'Module not installed at "%s"\n' "${1}"
    exit 2
  fi

  local target_module_path="${target_module_path}"

  if [[ ! -d "${target_path}"  ]]; then
    printf 'No valid target at "%s"\n' "${target_path}"
    exit 3
  fi

  rsync -avzh --delete "${source_path}/." "${target_path}"
}


function merge_packages () {

  if [[ ${#} -lt 1 ]]; then
    printf '\x1b[31m%s\x1b[0m\n' "Need target to merge package with..."
    exit 1
  fi

  "${MERGE_PCKG_BIN}" "${_ROOT}" ${@}

}

function parseErrors () {

  while read line; do {
    echo ${line}
    case ${line} in
      ^Error )
        notify_error "${line}"
        ;;
    esac
  } done

}

case ${1} in
  "copy_build" )
    shift
    copy_build ${@}
    ;;  

  "build" )
    build && deploy
    # notify_message "done" "Finished build & deploy"
    ;;

  "clean" )
  clean_build
  # notify_message "done" "Finished clean_build"
    ;;

  "deploy" )
  deploy
  # notify_message "done" "Finished deploy"
    ;;

  "merge" )
  shift
  merge_packages ${@}
  # notify_message "done" "Finished merge_packages"
    ;;

  "list" )
  list_ts "${BUILD_ROOT}"
    ;;

  "copy" )
  shift
  copy_release ${@}
  # notify_message "done" "Finished copy_release"
    ;;

  "notify_error" )
    notify_message "error" "${@}"
  ;;

  "notify_done" )
    notify_message "done" "${@}"
  ;;

  "notify" )
    shift
    notify_message "${@}"
  ;;
esac
