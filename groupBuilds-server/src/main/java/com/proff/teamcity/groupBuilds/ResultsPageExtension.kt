package com.proff.teamcity.groupBuilds

import jetbrains.buildServer.web.openapi.PagePlaces
import jetbrains.buildServer.web.openapi.PlaceId
import jetbrains.buildServer.web.openapi.PluginDescriptor
import jetbrains.buildServer.web.openapi.SimplePageExtension

class ResultsPageExtension(pagePlaces: PagePlaces, descriptor: PluginDescriptor) : SimplePageExtension(pagePlaces) {
    init {
        placeId = PlaceId.ALL_PAGES_FOOTER
        pluginName = "groupBuilds"
        addJsFile(descriptor.getPluginResourcesPath("js.cookie.js"))
        addJsFile(descriptor.getPluginResourcesPath("groupSnapshotResults.js"))
        register()
    }
}