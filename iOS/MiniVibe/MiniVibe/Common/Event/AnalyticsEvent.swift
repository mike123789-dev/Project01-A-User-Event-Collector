//
//  Event.swift
//  MiniVibe
//
//  Created by 강병민 on 2020/12/06.
//

import Foundation

protocol AnalyticsEvent: Codable {
    var name: String { get }
    var createdAt: String? { get }
    var metadata: [String: String]? { get }
}

struct BaseEvent: AnalyticsEvent {
    var id: Int?
    var name: String
    var createdAt: String?
    var metadata: [String: String]?
}