//
//  PlaylistRouter.swift
//  MiniVibe
//
//  Created by 류연수 on 2020/11/25.
//

import SwiftUI

enum PlaylistRoutingType: RoutingTypeProtocol {
    case magazines
    case recommended
    case favorites
}

class PlaylistRouter: StarterOrientedRouterProtocol {
    typealias RoutingStarter = PlaylistRoutingType
    
    let routingStarter: RoutingStarter
    
    init(routingStarter: RoutingStarter) {
        self.routingStarter = routingStarter
    }
    
    func getDestination() -> AnyView {
        switch routingStarter {
        case .magazines:
            return AnyView(MagazineView())
        case .recommended:
            return AnyView(PlaylistView())
        case .favorites:
            return AnyView(PlaylistView())
        }
    }
    
    func title() -> String {
        switch routingStarter {
        case .magazines:
            return "VIBE MAG"
        case .recommended:
            return "VIBE 추천 플레이리스트"
        case .favorites:
            return "즐겨듣는 플레이리스트"
        }
    }
}
